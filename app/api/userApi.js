import { server, config } from '@constants';

const login = async (email, password, device_name = 'phone') => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
        email,
        password,
        device_name
    });

    const params = {
        method: 'POST',
        headers,
        body
    };

    const url = `${server.BASE_URL}/api/v1/login`;

    const response = await fetch(url, params);

    const data = await response.json();

    return data;
};

export default { login };
