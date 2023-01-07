import hotkeys, { type KeyHandler } from "hotkeys-js";
import { State } from "utils-ts";


export abstract class ComponentState<StateName extends string, StateInput> extends State<StateName , StateInput>  {
	
	event_listeners : Array<[string , EventListener]> = [];
	protected keypress_events : Array<[string , string , KeyHandler]> = [];

	constructor(state_name : StateName) {
		super(state_name)
	}


	get name(): StateName {
		return this.state_name;
	}

	override onEnter(o: StateInput) {
		super.onEnter(o);
		this.addEventListeners();
		this.enter_hotkey_scope();
	}

	override onExit() {
		this.exit_hotkey_scope();
		this.removeEventListeners();
		return super.onExit();
	}

	/** Introduce all the shortcuts here using hotkeys-js lib. */
	protected enter_hotkey_scope() {
		hotkeys.setScope(this.name);
	}

	/** Revert all the shortcuts. */
	protected exit_hotkey_scope() {
		hotkeys.setScope("all");
	}


	private addEventListeners() {
		console.log("[COMPONENT-UTILS-TS] Add event listeners");
		this.event_listeners.forEach(
			(e) => {
				window.addEventListener( e[0] , e[1]);
			}
		)
	}


	private removeEventListeners() {
		this.event_listeners.forEach(
			(e) => {
				window.removeEventListener( e[0] , e[1]);
			}
		)
	}


	create_hotkey( key : string , method : KeyHandler) {
		console.log("[COMPONENT-UTILS-TS] Create hotkey");
		hotkeys(key , this.name , ( ke  , ht ) => {
			console.log(`[COMPONENT-UTILS-TS] State ${this.state_name} keypress : ${key} event is fired.`);
			method(ke , ht);
		});
	}
}

