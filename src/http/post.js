import HTTP from './axios';

export default {
  fmd() {
    let params = {};
    if (window.fmd_params) {
      params = window.fmd_params;
    }
    return params;
  },
  uppendparams(data) {
    const params = this.fmd();
    if (data instanceof FormData) {
      Object.keys(params).forEach((key) => {
        data.append(key, params[key]);
      });
      return data;
    }
    Object.keys(data).forEach((key) => {
      params[key] = data[key];
    });
    return params;
  },
  /**
   * Create new file
   * @param disk
   * @param path
   * @param name
   * @returns {AxiosPromise<any>}
   */
  createFile(disk, path, name) {
    const params = this.uppendparams({ disk, path, name });
    return HTTP.post('create-file', params);
  },

  /**
   * Update file
   * @param formData
   * @returns {*}
   */
  updateFile(formData) {
    const params = this.uppendparams(formData);
    return HTTP.post('update-file', params);
  },

  /**
   * Create new directory
   * @param data
   * @returns {*}
   */
  createDirectory(data) {
    const params = this.uppendparams(data);
    return HTTP.post('create-directory', params);
  },

  /**
   * Upload file
   * @param data
   * @param config
   * @returns {AxiosPromise<any>}
   */
  upload(data, config) {
    const params = this.uppendparams(data);
    return HTTP.post('upload', params, config);
  },

  /**
   * Delete selected items
   * @param data
   * @returns {*}
   */
  delete(data) {
    const params = this.uppendparams(data);
    return HTTP.post('delete', params);
  },

  /**
   * Rename file or folder
   * @param data
   * @returns {*}
   */
  rename(data) {
    const params = this.uppendparams(data);
    return HTTP.post('rename', params);
  },

  /**
   * Copy / Cut files and folders
   * @param data
   * @returns {*}
   */
  paste(data) {
    const params = this.uppendparams(data);
    return HTTP.post('paste', params);
  },

  /**
   * Zip
   * @param data
   * @returns {*}
   */
  zip(data) {
    const params = this.uppendparams(data);
    return HTTP.post('zip', params);
  },

  /**
   * Unzip
   * @returns {*}
   * @param data
   */
  unzip(data) {
    const params = this.uppendparams(data);
    return HTTP.post('unzip', params);
  },
};
