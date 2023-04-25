export const videoDatas = [
  {
    id: 993,
    title: '일몰',
    imgUrl:
      'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
    url: 'https://www.dropbox.com/s/1atyu36qpmazzbu/videoDetail6.mp4?raw=1',
    testUrl: require('@/assets/videoDetail6.mp4'),
  },
  {
    id: 994,
    title: '새끼양',
    imgUrl:
      'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
    url: 'https://www.dropbox.com/s/i6ag9q778we3w5z/videoDetail5.mp4?raw=1',
    testUrl: require('@/assets/videoDetail5.mp4'),
  },
  {
    id: 995,
    title: '두바이',
    imgUrl:
      'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
    url: 'https://www.dropbox.com/s/6q43hqareld9rsm/videoDetail4.mp4?raw=1',
    testUrl: require('@/assets/videoDetail4.mp4'),
  },
  {
    id: 996,
    title: '물고기',
    imgUrl:
      'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
    url: 'https://www.dropbox.com/s/5j3x564rg7he2yr/videoDetail3.mp4?raw=1',
    testUrl: require('@/assets/videoDetail3.mp4'),
  },
  {
    id: 997,
    title: '오로라',
    imgUrl:
      'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
    url: 'https://www.dropbox.com/s/3qsz9i93o1jttyu/videoDetail2.mp4?raw=1',
    testUrl: require('@/assets/videoDetail2.mp4'),
  },
  {
    id: 998,
    title: '꽃놀이',
    imgUrl:
      'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
    url: 'https://www.dropbox.com/s/by4ifytx4nv5ec4/videoDetail1.mp4?raw=1',
    testUrl: require('@/assets/videoDetail1.mp4'),
  },
  {
    id: 999,
    title: 'test',
    imgUrl:
      'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
    url: 'https://www.dropbox.com/s/bhubemuj35zztwr/test.mp4?raw=1',
    testUrl: require('@/assets/notfound.mp4'),
  },
];

export const videoHomeDatas = [
  {
    id: 994,
  },
  {
    id: 995,
  },
  {
    id: 996,
  },
  {
    id: 997,
  },
  {
    id: 998,
  },
  {
    id: 999,
  },
];

export const videoShortDatas = [
  {
    shortId: 0,
    id: 999,
  },
  {
    shortId: 1,
    id: 998,
  },
  {
    shortId: 2,
    id: 994,
  },
];

export const videoDetailDatas = [
  {
    id: 999,
    kind: 'step',
    stage: [
      {
        stageId: 1,
        stageTitle: '스트레칭',
        videoDetails: [
          {
            id: 998,
            kind: 'detail',
          },
          {
            id: 997,
            kind: 'detail',
          },
        ],
      },
      {
        stageId: 2,
        stageTitle: '기본기',
        videoDetails: [
          {
            id: 996,
            kind: 'detail',
          },
        ],
      },
      {
        stageId: 3,
        stageTitle: '튜토리얼',
        videoDetails: [
          {
            id: 995,
            kind: 'detail',
            stopTime: [
              {
                time: 3,
                imgUrl:
                  'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
                videoTimes: [
                  {
                    id: 998,
                    kind: 'detail',
                  },
                  {
                    id: 997,
                    kind: 'detail',
                  },
                ],
              },
              {
                time: 5,
                imgUrl:
                  'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
                videoTimes: [
                  {
                    id: 996,
                    kind: 'detail',
                  },
                ],
              },
              {
                time: 10,
                imgUrl:
                  'https://images.velog.io/images/dahunyoo/post/98d7a547-d297-46cf-a515-1ed0596c1056/QA___Test.png',
                videoTimes: [
                  {
                    id: 996,
                    kind: 'detail',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        stageId: 4,
        stageTitle: '춤 완성',
        videoDetails: [
          {
            id: 994,
            kind: 'detail',
          },
        ],
      },
      {
        stageId: 5,
        stageTitle: '스트레칭',
        videoDetails: [
          {
            id: 993,
            kind: 'detail',
          },
        ],
      },
    ],
  },
];
