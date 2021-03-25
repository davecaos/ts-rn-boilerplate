import {call, put, takeLatest, StrictEffect} from 'redux-saga/effects'
import {
  fetchTitleStart,
  fetchTitleSuccess,
  fetchTitleFailure,
  fetchWelcome as fetchWelcomeAction
} from '../../slices/welcome/welcome'
import {fetchWelcome, IFetchWelcomeResponse} from '../../api/welcome/welcome'
import {navigate} from '../../../services/navigation'

export function* fetchWelcomeWorker(): Generator<StrictEffect, void, IFetchWelcomeResponse> {
  try {
    yield put(fetchTitleStart())
    const {data} = yield call(fetchWelcome)
    yield put(fetchTitleSuccess(data.result.title))
  } catch (err) {
    yield put(fetchTitleFailure())
    yield call(navigate, 'HomeRoute')
  }
}

export default function* welcomeSaga(): Generator {
  yield takeLatest(fetchWelcomeAction, fetchWelcomeWorker)
}
