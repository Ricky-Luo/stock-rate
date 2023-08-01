import axios from 'axios';
import session from '../../util/SessionStorage';
import router from '../../router';
import notice from '../../util/Notice';
const SERVER_ADDRESS = 'stockRate/' // 后台服务器地址

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     hLoadingBar.start();
//     return config
//   },
//   err => {
//     hLoadingBar.error();
//     return Promise.reject(err)
//   }
// )


// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === '40016') { // token失效
      notice.setNotice('error', '您的登录已过期。');
      setTimeout(() => {
        if (router.currentRoute.name !== 'login') {
          router.push({ name: "login" });
        }
      }, 3000);
    }

    if (response.data.code && response.data.code !== '0') { // 后台报错
      notice.setNotice('error', '服务器后台报错：' + response.data.msg);
      return Promise.reject(new Error(response.data.msg));
    }
    return response;
  },
  error => {
    return Promise.reject(new Error(error));
  }
)


/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export const postWithURL = (url, data = {}) => {
  // 发请求前获取默认保存的token
  let token = session.getSessionStorage('token');
  if (token) {
    data['token'] = token;
  }
  else {
    if (router.currentRoute.name !== 'login') {
      notice.setNotice('error', '您的登录已过期。');
      router.push({ name: "login" });
      return;
    }
  }
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      data: data,
      url: SERVER_ADDRESS + url
    }

    axios(options).then(
      response => {
        if (response !== undefined && response.data !== undefined) {
          resolve(response.data)
        } else {
          reject(new Error(''))
        }
      },
      err => {
        reject(err)
      }
    )

  })
}

export const getWithURL = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    url = SERVER_ADDRESS + url;
    axios.get(url, { params: data }).then(
      response => {
        if (response === undefined) {
          reject(new Error('登录失效'))
        } else {
          resolve(response)
        }
      },
      err => {
        reject(err)
      }
    )
  })
}
// 使用get方法请求其他系统接口
export const getWithOtherURL = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      data: data,
      url: url,
      headers: {
        // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Access-Control-Allow-Origin': '*'
      },
    }
    axios(options).then(
      response => {
        if (response.data) {
          resolve(response.data)
        }
      },
      err => {
        reject(err)
      }
    )

  })
}
export const upload = (url, data = {}) => {
  // 发请求前获取默认保存的token
  let token = session.getSessionStorage('token');
  if (token) {
    // data['token'] = token;
    data.append("token", token);
  }
  else {
    if (router.currentRoute.name !== 'login') {
      notice.setNotice('error', '您的登录已过期。');
      router.push({ name: "login" });
      return;
    }
  }
  return new Promise((resolve, reject) => {
    url = SERVER_ADDRESS + url;
    const options = {
      method: 'POST',
      data: data,
      url: url,
      headers: { "Content-Type": "multipart/form-data" }
    }

    axios(options).then(
      response => {
        if (response === undefined) {
          reject(new Error('登录失效'))
        } else {
          resolve(response)
        }
      },
      err => {
        reject(err)
      }
    )
  })
}
export default {
  upload,
  postWithURL
}
