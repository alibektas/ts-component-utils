import hotkeys, { type KeyHandler } from "hotkeys-js";
import { State } from "utils-ts";

export abstract class AppState<StateName extends string, StateInput> extends State<StateName , StateInput>  {
	constructor(state_name : StateName) {
		super(state_name)
	}


	get name(): StateName {
		return this.state_name;
	}

	override onEnter(o: StateInput) {
		super.onEnter(o);
		this.enter_hotkey_scope();
	}

	override onExit() {
		super.onExit();
		this.exit_hotkey_scope();
	}

	/** Introduce all the shortcuts here using hotkeys-js lib. */
	protected enter_hotkey_scope() {
		hotkeys.setScope(this.name);
	}

	/** Revert all the shortcuts. */
	protected exit_hotkey_scope() {
		hotkeys.setScope("all");
	}


	protected addEventListeners() {
		throw new Error("NotImplemented");
	}


	protected removeEventListeners() {
		throw new Error("NotImplemented");
	}


	create_hotkey( key : string , method : KeyHandler) {
		console.log("Create hotkey");
		hotkeys(key , this.name , ( ke  , ht ) => {
			console.log(`State ${this.state_name} keypress : ${key} event is fired.`);
			method(ke , ht);
		});
	}
}

