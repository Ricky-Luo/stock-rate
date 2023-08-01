// 权限工具类
import session from './SessionStorage';

// 鉴定本登录用户是否有该权限，返回true 或 false
const isPermissible = function (authorityName) {
    let userRole = session.getSessionStorage('userRole');
    if (userRole && userRole.indexOf(authorityName) > -1) {
        return true;
    } else {
        return false;
    }
}
export default {
    isPermissible
}