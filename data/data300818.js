var navItems = [
    [
    {
      idx: 1,
      title: 'Option 1',
      content: 'Option 1 text content',
      img: 'img/Trait_17_00024.jpg',
      color: '#1C3764',
      txtColor:'#fff',
      target: ''
    },
    {
      idx: 2,
      title: 'Option 2',
      content: 'Option 2 text content',
      img: 'img/Trait_17_00026.jpg',
      color: '#D9D9D9',
      txtColor:'#333',
      target: ''
    },
    {
      idx: 3,
      title: 'This is Option 3',
      content: 'Option 3 text content',
      img: 'img/Trait_17_00035.jpg',
      color: '#6D9473',
      txtColor:'#fff',
      target: ''
    },
    {
      idx: 4,
      title: 'Option 4',
      content: 'Option 4 text content',
      img: 'img/Trait_17_00024.jpg',
      color: '#C7BC52',
      txtColor:'#fff',
      target: ''
    },
    {
      idx: 5,
      title: 'A longer Option 5',
      content: 'Option 5 text content',
      img: 'img/Trait_17_00026.jpg',
      color: '#E9E1A2',
      txtColor:'#333',
      target: ''
    },
    {
      idx: 6,
      title: 'Option 6',
      content: 'Option 6 text content',
      img: 'img/Trait_17_00035.jpg',
      color: '#004931',
      txtColor:'#fff',
      target: ''
    },
    {
      idx: 7,
      title: 'Mr James Chuter-Ede',
      content: 'Option 7 is Mr James Chuter-Ede',
      img: 'img/jce.jpg',
      color: '#996699',
      txtColor:'#fff',
      target: ''
    }
  ],
  [
    {
      idx: 1,
      title: 'Option 1',
      content: 'Option 1 text content',
      color: '#1C3764',
      target: ''
    },
    {
      idx: 2,
      title: 'Option 2',
      content: 'Option 2 text content',
      color: '#D9D9D9',
      target: ''
    },
    {
      idx: 3,
      title: 'This is Option 3',
      content: 'Option 3 text content',
      color: '#6D9473',
      target: ''
    },
    {
      idx: 4,
      title: 'Option 4',
      content: 'Option 4 text content',
      color: '#C7BC52',
      target: ''
    },
    {
      idx: 5,
      title: 'A longer Option 5',
      content: 'Option 5 text content',
      color: '#E9E1A2',
      target: ''
    },
    {
      idx: 6,
      title: 'Option 6',
      content: 'Option 6 text content',
      color: '#004931',
      target: ''
    }
  ],
  [
    {
      idx: 0,
      title: 'Option 1',
      content: 'Option 1 text content',
      color: '#1C3764',
      target: '0'
    },
    {
      idx: 1,
      title: 'A very much longer Option 2',
      content: 'Option 2 text content',
      color: '#d9d9d9',
      txtColor:'#333',
      target: '1'
    },
    {
      idx: 2,
      title: 'This is Option 3',
      content: 'Option 3 text content',
      color: '#6D9473',
      target: '3'
    },
    {
      idx: 3,
      title: 'Option 4',
      content: 'Option 4 text content',
      color: '#C7BC52',
      target: '4'
    }
  ],
  [
    {
      idx: 1,
      title: 'Option 1',
      content: 'Option 1 text content',
      color: '#1C3764',
      target: ''
    },
    {
      idx: 2,
      title: 'Option 2',
      content: 'Option 2 text content',
      color: '#D9D9D9',
      target: ''
    },
    {
      idx: 3,
      title: 'This is Option 3',
      content: 'Option 3 text content',
      color: '#6D9473',
      target: ''
    }
  ],
  [
    {
      idx: 1,
      title: 'Option 1',
      content: 'Option 1 text content',
      color: '#1C3764',
      target: ''
    },
    {
      idx: 2,
      title: 'Option 2',
      content: 'Option 2 text content',
      color: '#D9D9D9',
      target: ''
    }
  ]

];

var navMenus = {
    main: [
          {
            idx: 0,
            title: 'Traits',
            content: 'Traits text content',
            img: 'img/Trait_17_00026.jpg',
            color: '#1C3764',
            txtColor:'#fff',
            target: {
              type: 'menu',
              innerMenu: 'traits',
              outerMenu: 'main'
            }
          },
          {
            idx: 1,
            title: 'Guide',
            content: 'Guide text content',
            img: 'img/Trait_17_00024.jpg',
            color: '#9FABCD',
            txtColor:'#333',
            target: {
                type: 'menu',
                innerMenu: 'guide',
                outerMenu: 'main'
              }
          },
          {
            idx: 2,
            title: 'Ideal Cow',
            content: 'Ideal Cow text content',
            img: 'img/Trait_17_00035.jpg',
            color: '#C7BC52',
            txtColor:'#fff',
            target: {
                type: 'menu',
                innerMenu: 'ideal_cow',
                outerMenu: 'main'
              }
          }
        ],
    traits: [

        {
          idx: 0,
          title: 'Mammary',
          content: 'Mammary text content',
          color: '#1C3764',
          txtColor: '#fff',
          target: {
            type: 'menu',
            innerMenu: 'mammary',
            outerMenu: 'main'
          }
        },
        {
          idx: 1,
          title: 'Feet & Legs',
          content: 'Feet & Legs text content',
          color: '#9FABC0',
          txtColor: '#333',
          target: {
              type: 'view',
              view: 'traits',
              data: 'feet_legs'
            },
            items: [
                {
                  title: 'Feet & Legs #1',
                  content: 'Feet & Legs #1 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/feet_legs_1'
                },
                {
                  title: 'Feet & Legs #2',
                  content: 'Feet & Legs #2 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/feet_legs_2'
                },
                {
                  title: 'Feet & Legs #3',
                  content: 'Feet & Legs #3 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/feet_legs_3'
                },
                {
                  title: 'Feet & Legs #4',
                  content: 'Feet & Legs #4 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/feet_legs_4'
                }
              ]
        },
        {
          idx: 2,
          title: 'Body Conformation',
          content: 'Body Conformation text content',
          color: '#E9E1A2',
          txtColor: '#333',
          target: {
              type: 'view',
              view: 'traits',
              data: 'body_conformation'
            },
          items: [
              {
                title: 'Body Conform #1',
                content: 'Body Conform #1 text content',
                vid_src: 'video/test1.mp4',
                main_img: 'img/Trait_17_00035.jpg',
                img_path: 'img/traits/body_conform/body_conform_1'
              },
              {
                title: 'Body Conform #2',
                content: 'Body Conform #2 text content',
                vid_src: 'video/test1.mp4',
                main_img: 'img/Trait_17_00035.jpg',
                img_path: 'img/traits/body_conform/body_conform_2'
              },
              {
                title: 'Body Conform #3',
                content: 'Body Conform #3 text content',
                vid_src: 'video/test1.mp4',
                main_img: 'img/Trait_17_00035.jpg',
                img_path: 'img/traits/body_conform/body_conform_3'
              },
              {
                title: 'Body Conform #4',
                content: 'Body Conform #4 text content',
                vid_src: 'video/test1.mp4',
                main_img: 'img/Trait_17_00035.jpg',
                img_path: 'img/traits/body_conform/body_conform_4'
              },
              {
                title: 'Body Conform #5',
                content: 'Body Conform #5 text content',
                vid_src: 'video/test1.mp4',
                main_img: 'img/Trait_17_00035.jpg',
                img_path: 'img/traits/body_conform/body_conform_5'
              }
            ]
        },
        {
          idx: 3,
          title: 'Dairy Strength',
          content: 'Dairy Strength text content',
          color: '#C7BC52',
          txtColor: '#fff',
          target: {
              type: 'view',
              view: 'traits',
              data: 'dairy_strength'
            },
          items: [
                {
                  title: 'Dairy Strength #1',
                  content: 'Dairy Strength #1 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'video/test1.mp4',
                  img_path: 'img/traits/body_conform/dairy_strength_1'
                },
                {
                  title: 'Dairy Strength #2',
                  content: 'Dairy Strength #2 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/dairy_strength_2'
                },
                {
                  title: 'Dairy Strength #3',
                  content: 'Dairy Strength #3 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/dairy_strength_3'
                },
                {
                  title: 'Dairy Strength #4',
                  content: 'Dairy Strength #4 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/dairy_strength_4'
                },
                {
                  title: 'Dairy Strength #5',
                  content: 'Dairy Strength #5 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/dairy_strength_5'
                }
              ]
        }
      ],
    mammary: [
        {
          idx: 0,
          title: 'Teat Traits',
          content: 'Teat Traits text content',
          color: '#1C3764',
          txtColor: '#fff',
          target: {
              type: 'view',
              view: 'traits',
              data: 'teat_traits'
            },
            items: [
                {
                  title: 'Teat Traits #1',
                  content: 'Teat Traits #1 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/teat_traits_1'
                },
                {
                  title: 'Teat Traits #2',
                  content: 'Teat Traits #2 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/teat_traits_2'
                },
                {
                  title: 'Teat Traits #3',
                  content: 'Teat Traits #3 text content',
                  vid_src: 'video/test1.mp4',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/teat_traits_3'
                }
              ]

        },
        {
          idx: 1,
          title: 'Udder Traits',
          content: 'Udder Traits text content',
          color: '#d9d9d9',
          txtColor:'#333',
          target: {
              type: 'view',
              view: 'traits',
              data: 'udder_traits'
            },
            items: [
                {
                  title: 'Udder Traits #1',
                  content: 'Udder Traits #1 text content',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/udder_traits_1'
                },
                {
                  title: 'Udder Traits #2',
                  content: 'Udder Traits #2 text content',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/udder_traits_2'
                },
                {
                  title: 'Udder Traits #3',
                  content: 'Udder Traits #3 text content',
                  main_img: 'img/Trait_17_00035.jpg',
                  img_path: 'img/traits/body_conform/udder_traits_3'
                }
              ]
        }
      ],
    locomotion: [
      {
        idx: 0,
        title: 'Locomotion 1',
        content: 'Locomotion 1 text content',
        color: '#1C3764',
        target: {
            type: 'view',
            view: 'locomotion',
            data: 'locomotion_1'
          }
      },
      {
        idx: 1,
        title: 'Locomotion 2',
        content: 'Locomotion 2 text content',
        color: '#D9D9D9',
        target: {
            type: 'view',
            view: 'locomotion',
            data: 'locomotion_2'
          }
      },
      {
        idx: 2,
        title: 'Locomotion 3',
        content: 'Locomotion 3 text content',
        color: '#6D9473',
        target: {
            type: 'view',
            view: 'locomotion',
            data: 'locomotion_3'
          }
      }
    ],
    ideal_cow: [
      {
        idx: 0,
        title: 'Ideal Cow 1',
        content: 'Ideal Cow 1 text content',
        color: '#1C3764',
        target: {
            type: 'view',
            view: 'ideal_cow',
            data: 'ideal_cow_1'
          }
      },
      {
        idx: 1,
        title: 'Ideal Cow 2',
        content: 'Ideal Cow 2 text content',
        color: '#D9D9D9',
        target: {
            type: 'view',
            view: 'ideal_cow',
            data: 'ideal_cow_2'
          }
      }
    ],
  guide: [
      {
        idx: 0,
        title: 'Guide 1',
        content: 'Guide 1 text content',
        color: '#1C3764',
        target: {
            type: 'view',
            view: 'guide',
            data: 'guide_1'
          }
      },
      {
        idx: 1,
        title: 'Guide 2',
        content: 'Guide 2 text content',
        color: '#D9D9D9',
        target: {
            type: 'view',
            view: 'guide',
            data: 'guide_2'
          }
      }
  ]

};

var navOpts = {
  mainWheel: true,
  viewBoxSize: '0 0 800 800',
  x: 400,
  y: 400,
  fill: '#eee',
  stroke: '#eee',
  strokeWidth: 0,
  segStrokeWidth: 4,
  items: null,
  startAngle:-Math.PI/2,
  innerCircleR: 140,
  outerCircleR: 360,
  activeSliceR: 360,
  activeSliceIdx: 3,
  activeSliceFill: '#a00',
  navTxtTitleColor: '#fff',
  navTxtTitleSize: '1.6em',
  defaultCenterImg: 'img/Trait_17_00035.jpg',
  rotate: false,
  showSelectMarker: false,
  bg: '#999'
};

var navOptsOuter = {
  mainWheel: false,
  viewBoxSize: '0 0 800 800',
  x: 400,
  y: 400,
  fill: '#eee',
  stroke: '#eee',
  strokeWidth: 0,
  segStrokeWidth: 4,
  items: null,
  startAngle: -Math.PI/2,
  innerCircleR: 320,
  outerCircleR: 400,
  activeSliceR: 400,
  activeSliceIdx: 3,
  activeSliceFill: '#a00',
  navTxtTitleColor: '#fff',
  navTxtTitleSize: '2em',
  defaultCenterImg: '',
  rotate: true,
  showSelectMarker: true,
  bg: '#c99'
};

var sideTabs = [
  {
    title: 'tab 1',
    bg: '#c00',
    target: ''
  }
]
