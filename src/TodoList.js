import React, { Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import * as TodoActions from "./store/actions/todos";

const TodoList = ({ todos, addTodo, removeTodo }) => (
    <Fragment>
        <ul>
            {todos.map(todo => (
                <div>
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => removeTodo(todo.id)}>
                            Remover
                        </button>
                    </li>
                </div>
            ))}
        </ul>
        <button onClick={() => addTodo("Fazer café de novo")}>Adicionar</button>
    </Fragment>
);

TodoList.propTypes = {
    addTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            text: PropTypes.string
        })
    ).isRequired
};

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TodoActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
