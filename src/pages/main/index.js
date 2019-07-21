import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import * as FavoriteActions from "../../store/actions/favorites";

class Main extends Component {
    static propTypes = {
        favorites: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
            })
        ),
        addFavorite: PropTypes.func.isRequired
    };

    state = {
        repositoryInput: ""
    };

    handleAddRepository = event => {
        event.preventDefault();

        this.props.addFavorite();
    };

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleAddRepository}>
                    <input
                        type="text"
                        placeholder="usuário/repositório"
                        value={this.state.repositoryInput}
                        onChange={e =>
                            this.setState({
                                handleAddRepository: e.target.value
                            })
                        }
                    />
                    <button type="submit">Adicionar</button>
                </form>

                <ul>
                    {this.props.favorites.map(favorite => (
                        <li>
                            <p>
                                <strong>{favorite.name}</strong> (
                                {favorite.description})
                            </p>
                            <a href={favorite.url}>Acessar</a>
                        </li>
                    ))}
                </ul>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    favorites: state.favorites
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(FavoriteActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
