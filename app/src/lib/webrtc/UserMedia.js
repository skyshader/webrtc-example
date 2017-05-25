import errors from '../../constants/errors';

const UserMedia = {
  getUserMedia: (constraints) => {
    if (constraints === undefined) {
      constraints = {
        audio: true,
        video: {
          width: {min: 640, ideal: 1280, max: 1920},
          height: {min: 480, ideal: 720, max: 1080},
          facingMode: "user"
        }
      };
    }

    if (!constraints.audio && !constraints.video) {
      let err = new Error();
      err.code = errors.USER_MEDIA_INVALID_CONSTRAINTS.code;
      err.message = errors.USER_MEDIA_INVALID_CONSTRAINTS.message;
      err.description = errors.USER_MEDIA_INVALID_CONSTRAINTS.description;
      throw err;
    }

    return navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        return stream;
      })
      .catch(error => {
        let err = new Error();

        if (error.name === 'NotAllowedError') {
          err.code = errors.USER_MEDIA_PERMISSION_NOT_GRANTED.code;
          err.message = errors.USER_MEDIA_PERMISSION_NOT_GRANTED.message;
          err.description = errors.USER_MEDIA_PERMISSION_NOT_GRANTED.description;
          throw err;
        }

        if (error.name === 'NotFoundError' || error.name === 'OverConstrainedError') {
          err.code = errors.USER_MEDIA_NOT_FOUND.code;
          err.message = errors.USER_MEDIA_NOT_FOUND.message;
          err.description = errors.USER_MEDIA_NOT_FOUND.description;
          throw err;
        }

        if (error.name === 'SecurityError') {
          err.code = errors.USER_MEDIA_NOT_ALLOWED_ON_BROWSER.code;
          err.message = errors.USER_MEDIA_NOT_ALLOWED_ON_BROWSER.message;
          err.description = errors.USER_MEDIA_NOT_ALLOWED_ON_BROWSER.description;
          throw err;
        }

        if (error.name === 'AbortError' || error.name === 'NotReadableError') {
          err.code = errors.USER_MEDIA_NOT_ALLOWED_ON_BROWSER.code;
          err.message = errors.USER_MEDIA_NOT_ALLOWED_ON_BROWSER.message;
          err.description = errors.USER_MEDIA_NOT_ALLOWED_ON_BROWSER.description;
          throw err;
        }

        if (error.name === 'TypeError') {
          err.code = errors.USER_MEDIA_INVALID_CONSTRAINTS.code;
          err.message = errors.USER_MEDIA_INVALID_CONSTRAINTS.message;
          err.description = errors.USER_MEDIA_INVALID_CONSTRAINTS.description;
          throw err;
        }

        err.code = errors.USER_MEDIA_UNIDENTIFIED_ERROR.code;
        err.message = errors.USER_MEDIA_UNIDENTIFIED_ERROR.message;
        err.description = errors.USER_MEDIA_UNIDENTIFIED_ERROR.description;
        throw err;
      });
  },
};

export default UserMedia;
