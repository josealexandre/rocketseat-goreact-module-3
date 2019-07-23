import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import * as FavoriteActions from "../../store/actions/favorites";

class Main extends Component {
    static propTypes = {
        favorites: PropTypes.shape({
            loading: PropTypes.bool,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    name: PropTypes.string,
                    description: PropTypes.string,
                    url: PropTypes.string
                })
            ),
            error: PropTypes.oneOfType([null, PropTypes.string])
        }).isRequired,
        addFavoriteRequest: PropTypes.func.isRequired
    };

    state = {
        repositoryInput: ""
    };

    handleAddRepository = event => {
        event.preventDefault();

        this.props.addFavoriteRequest(this.state.repositoryInput);

        this.setState({ repositoryInput: "" });
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
                                repositoryInput: e.target.value
                            })
                        }
                    />
                    <button type="submit">Adicionar</button>
                    {this.props.favorites.loading && <span>Carregando...</span>}
                    {this.props.favorites.error && (
                        <span style={{ color: "#f00" }}>
                            {this.props.favorites.error}
                        </span>
                    )}
                </form>

                <ul>
                    {this.props.favorites.data.map(favorite => (
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
