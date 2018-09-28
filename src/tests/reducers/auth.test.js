import authReducer from '../../reducers/auth';

const uid = 'asdasdasd';

test('should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer({}, action);
    expect(state).toEqual({ uid });
});

test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT',
        uid
    }
    const state = authReducer({ uid }, action);
    expect(state).toEqual({});
});
