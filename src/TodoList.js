import React, { Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const TodoList = props => (
    <Fragment>
        <ul>
            {props.todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
        <button onClick={() => props.addTodo("Fazer café de novo")}>
            Adicionar
        </button>
    </Fragment>
);

TodoList.propTypes = {
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

const mapDispatchToProps = dispatch => ({
    addTodo: text => dispatch({ type: "ADD_TODO", payload: { text } })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
