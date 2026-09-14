const {after, before, beforeEach, test} = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const {setupApp} = require('../../../dist/setup-app');

const videosPath = '/hometask_01/api/videos';
const testVideoData = {
    title: 'Node.js lesson',
    author: 'Valentin',
    availableResolutions: ['P720'],
};

let server;
let baseUrl;

before(async () => {
    const app = setupApp(express());
    server = app.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    if (server) {
        await new Promise((resolve, reject) =>
            server.close(error => error ? reject(error) : resolve())
        );
    }
});

const send = (method, path, body) => fetch(`${baseUrl}${path}`, {
    method,
    headers: body === undefined ? undefined : {'content-type': 'application/json'},
    body: body === undefined ? undefined : JSON.stringify(body),
});

const createVideo = async (body = testVideoData) => {
    const response = await send('POST', videosPath, body);
    assert.equal(response.status, 201);
    return response.json();
};

beforeEach(async () => {
    const response = await send('DELETE', '/hometask_01/api/testing/all-data');
    assert.equal(response.status, 204);
});

test('should create video; POST /videos', async () => {
    const video = await createVideo();

    assert.equal(video.id, 1);
    assert.equal(video.title, testVideoData.title);
    assert.equal(video.author, testVideoData.author);
    assert.deepEqual(video.availableResolutions, testVideoData.availableResolutions);
    assert.equal(video.canBeDownloaded, false);
    assert.equal(video.minAgeRestriction, null);
    assert.ok(!Number.isNaN(Date.parse(video.createdAt)));
    assert.ok(!Number.isNaN(Date.parse(video.publicationDate)));
});

test('should return videos list; GET /videos', async () => {
    const first = await createVideo();
    const second = await createVideo({...testVideoData, title: 'Another lesson'});

    const response = await send('GET', videosPath);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), [first, second]);
});

test('should return video by id; GET /videos/:id', async () => {
    const video = await createVideo();

    const response = await send('GET', `${videosPath}/${video.id}`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), video);
});

test('should update video; PUT /videos/:id', async () => {
    const video = await createVideo();
    const update = {
        title: 'Updated lesson',
        author: 'Another author',
        availableResolutions: ['P1080'],
        canBeDownloaded: true,
        minAgeRestriction: 12,
        publicationDate: '2026-10-01T00:00:00.000Z',
    };

    const updateResponse = await send('PUT', `${videosPath}/${video.id}`, update);
    assert.equal(updateResponse.status, 204);

    const getResponse = await send('GET', `${videosPath}/${video.id}`);
    assert.equal(getResponse.status, 200);
    assert.deepEqual(await getResponse.json(), {...video, ...update});
});

test('should delete video and check after "NOT FOUND"; DELETE /videos/:id', async () => {
    const video = await createVideo();

    const deleteResponse = await send('DELETE', `${videosPath}/${video.id}`);
    assert.equal(deleteResponse.status, 204);

    const getResponse = await send('GET', `${videosPath}/${video.id}`);
    assert.equal(getResponse.status, 404);
});
