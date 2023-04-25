import {videoDatas, videoDetailDatas} from '@/static/videoDatas';

export const videoIdFilter = (videoInfo: any) => {
  return {
    ...videoDatas.filter((data: any) => {
      if (data.id === videoInfo.id) {
        return data;
      }
    })[0],
    ...videoInfo,
  };
};

export const videoDetailFilter = (id: number, Fn: Function) => {
  const video = videoDetailDatas.filter((data: any) => {
    if (data.id === id) {
      return data;
    }
  })[0];

  for (let i = 0; i < video.stage.length; i++) {
    const videoDetail = video.stage[i].videoDetails;
    for (let j = 0; j < videoDetail.length; j++)
      videoDetail[j] = videoIdFilter(videoDetail[j]);

    const videoStopTime = video.stage[i].videoDetails[0].stopTime;
    if (videoStopTime !== undefined)
      for (let j = 0; j < videoStopTime.length; j++) {
        const videoTime = video.stage[i].videoDetails[0].stopTime[j].videoTimes;
        for (let k = 0; k < videoTime.length; k++)
          videoTime[k] = videoIdFilter(videoTime[k]);
      }
  }

  return video;
};
