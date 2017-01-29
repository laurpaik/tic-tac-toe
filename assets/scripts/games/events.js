'use strict';

const api = require('./api.js');
const ui = require('./ui.js');
const store = require('../store');
const game = require('../example');


const getFormFields = require('../../../lib/get-form-fields');

const onCreateGame = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);
  api.create(data)
    .then((response) => {
      store.game = response.game;
    })
    .then(ui.onPostSuccess)
    .catch(ui.onError);
};

const onGetGames = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  if (data.game.id.length === 0) {
    api.index()
    .then(ui.onSuccess)
    .catch(ui.onError);
  } else {
    api.show(data.game.id)
    .then(ui.onSuccess)
    .catch(ui.onError);
  }

};

const addHandlers = () => {
  $('#game-search').on('submit', onGetGames);
};

module.exports = {
  onGetGames,
  onCreateGame,
  addHandlers,
};
