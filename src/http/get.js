import HTTP from './axios';

export default {
  fmd() {
    let params = {};
    if (window.fmd_params) {
      params = window.fmd_params;
    }
    return params;
  },
  /**
   * Get configuration data from server
   * @returns {*}
   */
  initialize() {
    const params = this.fmd();
    return HTTP.get('initialize', { params });
  },

  /**
   * Get directories for the tree (upper level)
   * @param disk
   * @param path
   * @returns {*}
   */
  tree(disk, path) {
    const params = this.fmd();
    params.disk = disk;
    params.path = path;
    return HTTP.get('tree', { params });
  },

  /**
   * Select disk
   * @param disk
   * @returns {*}
   */
  selectDisk(disk) {
    const params = this.fmd();
    params.disk = disk;

    return HTTP.get('select-disk', { params });
  },

  /**
   * Get content (files and folders)
   * @param disk
   * @param path
   * @returns {*}
   */
  content(disk, path) {
    const params = this.fmd();
    params.disk = disk;
    params.path = path;

    return HTTP.get('content', { params });
  },

  /**
   * Item properties
   */
  /* properties(disk, path) {
    return HTTP.get('properties', { params: { disk, path } });
  }, */

  /**
   * URL
   * @param disk
   * @param path
   * @returns {*}
   */
  url(disk, path) {
    const params = this.fmd();
    params.disk = disk;
    params.path = path;

    return HTTP.get('url', { params });
  },

  /**
   * Get file to editing or showing
   * @param disk
   * @param path
   * @returns {*}
   */
  getFile(disk, path) {
    const params = this.fmd();
    params.disk = disk;
    params.path = path;

    return HTTP.get('download', { params });
  },

  /**
   * Get file - ArrayBuffer
   * @param disk
   * @param path
   * @returns {*}
   */
  getFileArrayBuffer(disk, path) {
    const params = this.fmd();
    params.disk = disk;
    params.path = path;

    return HTTP.get('download', {
      responseType: 'arraybuffer',
      params,
    });
  },

  /**
   * Image thumbnail
   * @param disk
   * @param path
   * @returns {*}
   */
  thumbnail(disk, path) {
    const params = this.fmd();
    params.disk = disk;
    params.path = path;

    return HTTP.get('thumbnails', {
      responseType: 'arraybuffer',
      params,
    });
  },

  /**
   * Image preview
   * @param disk
   * @param path
   * @return {*}
   */
  preview(disk, path) {
    const params = this.fmd();
    params.disk = disk;
    params.path = path;

    return HTTP.get('preview', {
      responseType: 'arraybuffer',
      params,
    });
  },

  /**
   * Download file
   * @param disk
   * @param path
   * @return {*}
   */
  download(disk, path) {
    const params = this.fmd();
    params.disk = disk;
    params.path = path;

    return HTTP.get('download', {
      responseType: 'arraybuffer',
      params,
    });
  },
};
