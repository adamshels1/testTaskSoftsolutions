import { server, config } from '@constants';
import { helper } from '@services';

const saveReview = async (token, fileData, body) => {

    const headers = {
        'Authorization': `Bearer ${token}`,
    };

    const { uri, codec = "mp4" } = fileData;
    const type = `video/${codec}`;

    const formData = new FormData();
    formData.append("file", {
        name: "file",
        type,
        uri: helper.filePathSource(uri)
    });

    Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
    });

    const params = {
        method: 'POST',
        headers,
        body: formData
    };

    const url = `${server.BASE_URL}/api/v1/reviews`;

    const response = await fetch(url, params);

    const data = await response.json();

    return data;
};

export default { saveReview };
