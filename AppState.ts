import hotkeys, { type KeyHandler } from "hotkeys-js";

export abstract class AppState<StateName extends string, StateInput> {
	constructor(protected state_name: StateName) {}

	protected _state: StateInput | null = null;

	get name(): StateName {
		return this.state_name;
	}

	onEnter(o: StateInput) {
		console.log(`utils-ts onEnter() , state : ${this.state_name}`);
		this._state = o;
		this.enter_hotkey_scope();
	}

	onExit() {
		console.log(`utils-ts onExit() , state : ${this.state_name}`);
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

