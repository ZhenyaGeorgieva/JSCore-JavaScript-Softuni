const userModel = function () {

    const register = function (params) {
        let data = {
            username: params.username,//проверка дали това са params, с които ще се регистрира usera, да отговарят на имената във формата за регистрация;
            password: params.password,
            email: params.email,
            avatarUrl: params.avatarUrl
        };

        let url = `/user/${storage.appKey}`;

        let auth = btoa(`${storage.appKey}:${storage.appSecret}`);
        let authString = `Basic ${auth}`;

        let headers = {
            body: JSON.stringify(data),
            headers: {
                Authorization: authString
            }
        };

        return requester.post(url, headers);
    };

    const login = function (params) {

        let url = `/user/${storage.appKey}/login`;

        let auth = btoa(`${params.username}:${params.password}`);
        let authString = `Basic ${auth}`;

        let headers = {
            headers: {
                Authorization: authString
            },
            body: JSON.stringify({...params})
        };

        return requester.post(url, headers);
    };

    const logout = function () {
    
        let url = `/user/${storage.appKey}/_logout`;
        let headers = {
            headers: {}
        };
        
        return requester.post(url, headers);
    };

    const getUser = function (id) {
    
        let url = `/user/${storage.appKey}/${id}`;
        let headers = {
            headers: {}
        };
        
        return requester.get(url, headers);
    };

    const deleteUser=function(id){
        
        let url = `/user/${storage.appKey}/${id}`;
        let headers = {
            headers: {}
        };
        
        return requester.del(url, headers);
    };

    return {
        register,
        login,
        logout,
        getUser,
        deleteUser
    }
}();