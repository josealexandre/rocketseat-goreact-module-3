import api from "../../services/api";
import { call, put, select } from "redux-saga/effects";

import { Creators as FavoriteActions } from "../ducks/favorites";

export function* addFavorite(action) {
    try {
        const { data } = yield call(
            api.get,
            `/repos/${action.payload.repository}`
        );

        const existingFavorite = yield select(state =>
            state.favorites.data.find(favorite => favorite.id === data.id)
        );

        if (existingFavorite) {
            console.tron.log(existingFavorite);
            yield put(
                FavoriteActions.addFavoriteFailure("Repositório duplicado")
            );
            return;
        }

        const repositoryData = {
            id: data.id,
            name: data.full_name,
            description: data.description,
            url: data.html_url
        };

        yield put(FavoriteActions.addFavoriteSuccess(repositoryData));
    } catch (err) {
        yield put(
            FavoriteActions.addFavoriteFailure("Erro ao adicionar repositório")
        );
    }
}
