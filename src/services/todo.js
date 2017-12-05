import uid from '../helpers/uid';

class TodoService {
  
  static add(message) {
    TodoService.lastPosition ++;
    TodoService.list = TodoService.list.concat([{
      uid: uid(),
      todo: message,
      date: Date.now(),
      completed: false,
      position: TodoService.lastPosition,
    }]);
  }
  static finish(uid) {
    TodoService.list = TodoService.list.map((todo) => {
      if (todo.uid = uid) {
        todo.completed = true;
      }

      return todo;
    });
  }
  static remove(uid) {
    let removed;
    TodoService.list = TodoService.list.filter((todo) => {
      // return todo.uid !== uid;
      if (todo.uid === uid) {
        removed = todo;

        return false;
      }

      return true;
    });

    return removed;
  }

  static reorder(uid, newPos) {
    let item = TodoService.remove(uid);
    item.position = newPos;

    TodoService.list = TodoService.list
      .map((todo, i) => {
        let index = (i < newPos) ? i : i+1;
        todo.position = index;

        return todo;
      })
      .concat([item]);
  }
}

Object.defineProperties(TodoService, {
  'lastPosition': {
    get: () => {
      let val = parseInt(localStorage.getItem('tabula-rasa.lastPosition'));
      if (isNaN(val)) {
        localStorage.setItem('tabula-rasa.lastPosition', '-1')

        return -1;
      }
      return val;
    },
    set: (val) => {
      localStorage.setItem('tabula-rasa.lastPosition', val.toString());
    }
  },
  'list': {
    get: () => {
      let list;
      try {
        list = JSON.parse(localStorage.getItem('tabula-rasa.todos') || '[]');
      } catch (err) {
        list = [];
      }

      return list.sort((a, b) => { return a.position > b.position; })
    },
    set: (value) => {
      localStorage.setItem('tabula-rasa.todos', JSON.stringify(value));
    },
  }
});

module.exports = TodoService;