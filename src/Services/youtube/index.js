import * as _ from 'lodash';
import * as Url from 'url';
import ServiceResponseError from '../../Exceptions/ServiceResponseError';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyAeszS6A5O1AWg65PK_Zf6XuLdr1PDex5w';
const SURF_SEARCH_TERM = 'surf';

const DEFAULT_OPTIONS = {
    key: API_KEY,
    part: 'snippet',
    type: 'video',
    q: 'surf'
};

export default class YoutubeService {
    _buildSearchUrl(options) {
        let queryOptions = {};

        if (options.queryParams) {
            queryOptions.q = DEFAULT_OPTIONS.q.concat('+', options.queryParams.join('+'));
        }

        if(options.nextPageToken) {
            queryOptions.pageToken = options.nextPageToken;
        }

        let queryObject = _.merge(DEFAULT_OPTIONS, queryOptions);
        let queryString = Object.keys(queryObject).map(q => `${encodeURIComponent(q)}=${encodeURIComponent(queryObject[q])}`).join('&');
        return `${YOUTUBE_BASE_URL}/search?${queryString}`;
    }

    _createVideoModelFromResponse(response) {
        let model = {
            videoId: response.id.videoId,
            videoUrl: `https://youtube.com/video/${response.id.videoId}`,
            title: response.snippet.title,
            description: response.snippet.description,
            channelId: response.snippet.channelId,
            author: response.snippet.channelTitle,
            thumbnailUrl: response.snippet.thumbnails.default.url
        };

        return model;
    }

    _getUploadPlaylistIdFromChannel(channelId) {
        let requestOptions = {
            method: 'GET'
        };

        let url = `${YOUTUBE_BASE_URL}/channels?key=${API_KEY}&part=contentDetails&id=${channelId}`;

        return fetch(url, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } 
                else {
                    throw new ServiceResponseError(`Error fetching channel data from Youtube for id ${channelId}`, response);
                }
            })
            .then((jsonResponse) => {
                if (_.isNil(jsonResponse) || _.isNil(jsonResponse.items)) {
                    return null;
                }

                return jsonResponse.items[0].contentDetails.relatedPlaylists.uploads;
            });
    }

    getVideoUploadsByChannelId(channelId, maxResults) {
        return this._getUploadPlaylistIdFromChannel(channelId)
            .then((uploadPlaylistId) => {
                if (_.isNull(uploadPlaylistId)) {
                    return null;
                }
        
                let requestOptions = {
                    method: 'GET'
                };
        
                let url = `${YOUTUBE_BASE_URL}/playlistItems?key=${API_KEY}&part=contentDetails,snippet&playlistId=${uploadPlaylistId}`;
        
                if (!_.isUndefined(maxResults)) {
                    url = url.concat(`&maxResults=${maxResults}`);
                }
        
                return fetch(url, requestOptions)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } 
                        else {
                            throw new ServiceResponseError(`Error fetching channel data from Youtube for id ${channelId}`, response);
                        }
                    })
                    .then((jsonResponse) => {
                        if (_.isNil(jsonResponse) || _.isNil(jsonResponse.items)) {
                            return null;
                        }
        
                        let response = _.map(jsonResponse.items, (item) => {
                            return {
                                videoId: item.contentDetails.videoId,
                                videoUrl: `https://youtube.com/video/${item.contentDetails.videoId}`,
                                title: item.snippet.title,
                                channelId: item.snippet.channelId,
                                author: item.snippet.channelTitle,
                                thumbnailUrl: item.snippet.thumbnails.default.url
                            };
                        });
        
                        return response;
                    });
            });
    }

    executeSearchQuery(options) {
        let requestOptions = {
            method: 'GET'
        };

        let url = this._buildSearchUrl(options);

        return fetch(url, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } 
                else {
                    throw new ServiceResponseError(`Error fetching search data from Youtube`, response);
                }
            })
            .then((jsonResponse) => {
                if (_.isNil(jsonResponse) || _.isNil(jsonResponse.items)) {
                    return null; // Return null for now since we have no way of getting data
                }

                let videoModels = _.map(jsonResponse.items, (item) => {
                    return this._createVideoModelFromResponse(item);
                });

                return {
                    nextPageToken: jsonResponse.nextPageToken || null,
                    videos: videoModels
                };
            });
    }

    


}