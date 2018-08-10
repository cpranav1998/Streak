import {decorate, observable, autorun, action, computed} from "mobx";


class appStore {
	habits: [];
	
	maxStreak(name) {
		return this.habits.filter(
			habit => habit.name === name
			)[0].maxstreak;
	}
	streak(name) {
		return this.habits.filter(
			habit => habit.name === name
			)[0].streak;
	}
	set setStreak(name) {
		this.habits.filter(
			habit => habit.name === name
			)[0].streak = 0;
	}
	addHabit(name, tag) {
		this.habits.push({
			name: name,
			tag: tag,
			streak: 0,
			maxstreak: 0
		});
	}

}

decorate(appStore, {
    habits: observable,
    maxStreak: computed,
    streak: computed,
    setStreak: action,
    addHabit: action
})

var store = new appStore()