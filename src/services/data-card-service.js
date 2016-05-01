import {inject} from 'aurelia-framework';
import _ from 'lodash';
import PouchDB from 'pouchdb';

const VALID_TYPES = [
  'strike'
];

/**
 * Service for persisting data cards using PouchDB.
 */
@inject(PouchDB)
export class DataCardService {
  static validateType(type) {
    return _.includes(VALID_TYPES, type);
  }

  constructor(pouchDb) {
    this.db = new pouchDb('data-card-store');
  }

  /**
   * Gets all data cards off of the store.
   *
   * @returns {Promise} - A promise that resolves with an {Array} of all data cards.
   */
  all() {
    return new Promise((resolve, reject) => {
      this.db.allDocs({
          include_docs: true
        })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  /**
   * Retrieves all data cards of a specific type.
   *
   * @param {string} type - The specific type of data card to retrieve.
   * @returns {Promise} - A promise that resolves with a list containing all data cards of the requested type.
   */
  allType(type) {
    return new Promise((resolve, reject) => {
      if (!DataCardService.validateType(type)) {
        reject('Invalid type.');
      }

      this.db.allDocs({
          include_docs: true,
          startKey: `${type}_`,
          endKey: `${type}_\uffff`
        })
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  }

  /**
   * Creates a new data card on the store.
   *
   * @param {string} title - The title of the data card.
   * @param {string} type - The type of the data card.
   * @param {Object} fields - The fields that the data card has, and their values.
   * @returns {Promise} - A promise that resolves when the new document is created successfully.
   */
  create(title, type, fields) {
    return new Promise((resolve, reject) => {
      if (!DataCardService.validateType(type)) {
        reject('Invalid type.');
      }

      let id = _.uniqueId(`${type}_`);

      this.db.put({
          _id: id,
          title: title,
          type: type,
          fields: fields
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * Searches the store for a specific data card and returns it.
   *
   * @param id - The ID of the data card document.
   * @returns {Promise} - A promise that resolves with the desired document.
   */
  find(id) {
    return new Promise((resolve, reject) => {
      this.db.get(id)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  /**
   * Removes a data card from the store permanently.
   *
   * @param dataCard - The data card object to remove.
   * @returns {Promise} - A promise that resolves once the task is complete.
   */
  remove(dataCard) {
    return new Promise((resolve, reject) => {
      this.db.remove(dataCard)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  /**
   * Updates a data card on the store.
   *
   * @param dataCard - The data card object with updates to store.
   * @returns {Promise} - A promise that resolves once the task is complete and returns the updated ID & Revision.
   */
  update(dataCard) {
    return new Promise((resolve, reject) => {
      if (!DataCardService.validateType(dataCard.type)) {
        reject('Invalid type.');
      }

      this.db.put(dataCard)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}