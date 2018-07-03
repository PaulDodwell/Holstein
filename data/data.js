
var navMenus = {
    main: {
      name: 'main',
      parent: 'main',
      items: [
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
          ]
        },
    traits: {
      name: 'traits',
      parent: 'main',
      items: [
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
            type: 'menu',
            innerMenu: 'feet_legs',
            outerMenu: 'main'
          }
        },
        {
          idx: 2,
          title: 'Body Conformation',
          content: 'Body Conformation text content',
          color: '#E9E1A2',
          txtColor: '#333',
          target: {
              type: 'menu',
              innerMenu: 'body_conformation',
              outerMenu: 'main'
            }
          },
        {
          idx: 3,
          title: 'Dairy Strength',
          content: 'Dairy Strength text content',
          color: '#C7BC52',
          txtColor: '#fff',
          target: {
              type: 'menu',
              innerMenu: 'dairy_strength',
              outerMenu: 'main'
            }
          }
        ]
      },
    mammary: {
      name: 'mammary',
      parent: 'traits',
      items: [
        {
          idx: 0,
          title: 'Teat Traits',
          content: 'Teat Traits text content',
          color: '#1C3764',
          txtColor: '#fff',
          target: {
            type: 'menu',
            innerMenu: 'teat_traits',
            outerMenu: 'main'
            }
        },
        {
          idx: 1,
          title: 'Udder Traits',
          content: 'Udder Traits text content',
          color: '#d9d9d9',
          txtColor:'#333',
          target: {
            type: 'menu',
            innerMenu: 'udder_traits',
            outerMenu: 'main'
            }
          }
        ]
      },
      udder_traits: {
        name: 'udder_traits',
        parent: 'mammary',
        items: [
            {
              idx: 0,
              title: 'Fore Udder Attachment',
              content: 'Fore Udder Attachment text content',
              color: '#1C3764',
              txtColor: '#fff',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/udder_traits/fore_udder_attachment',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'udder_traits/fore_udder_attachment'
                }
            },
            {
              idx: 1,
              title: 'Rear Udder Height',
              content: 'Rear Udder Height text content',
              color: '#d9d9d9',
              txtColor:'#333',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/udder_traits/rear_udder_height',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'udder_traits/rear_udder_height'
                }
            },
            {
              idx: 2,
              title: 'Udder Support',
              content: 'Udder Support text content',
              color: '#1C3764',
              txtColor: '#fff',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/udder_traits/udder_support',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'udder_traits/udder_support'
                }
            },
            {
              idx: 3,
              title: 'Udder Texture',
              content: 'Udder Texture text content',
              color: '#d9d9d9',
              txtColor:'#333',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/udder_traits/udder_texture',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'udder_traits//udder_texture'
                }
            }
          ]
      },
      teat_traits: {
        name: 'teat_traits',
        parent: 'mammary',
        items: [
            {
              idx: 0,
              title: 'Front Teat Placement',
              content: 'Front teat placement text content',
              color: '#1C3764',
              txtColor: '#fff',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/body_conform/front_teat_placement',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'teat_traits/front_teat_placement'
                }
            },
            {
              idx: 1,
              title: 'Rear Teat Placement',
              content: 'Rear teat placement text content',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/body_conform/rear_teat_placement',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'teat_traits/rear_teat_placement'
                }
            },
            {
              idx: 2,
              title: 'Teat Placement Side View',
              content: 'Teat Traits #2 text content',
              color: '#1C3764',
              txtColor: '#fff',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/body_conform/teat_placement_side_view',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'teat_traits/teat_placement_side_view'
                }
            },
            {
              idx: 3,
              title: 'Teat Length',
              content: 'Teat length text content',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/body_conform/teat_length',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'teat_traits/teat_length'
                }
            }
          ]
      },
    feet_legs: {
      name: 'feet_legs',
      parent: 'traits',
      items: [
        {
          idx: 0,
          title: 'Rear Leg Side View',
          content: 'Rear Leg Side View text content',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/feet_legs/rear_leg_side_view',
          target: {
              type: 'view',
              view: 'traits',
              data: 'feet_legs/rear_leg_side_view'
            }
        },
        {
          idx: 1,
          title: 'Rear Leg Rear View',
          content: 'Rear Leg Rear View text content',
          color: '#d9d9d9',
          txtColor:'#333',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/feet_legs/rear_leg_rear_view',
          target: {
              type: 'view',
              view: 'traits',
              data: 'feet_legs/rear_leg_rear_view'
            }
        },
        {
          idx: 2,
          title: 'Foot Angle',
          content: 'Foot Angle text content',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/feet_legs/foot_angle',
          target: {
              type: 'view',
              view: 'traits',
              data: 'feet_legs/foot_angle'
            }
        },
        {
          idx: 3,
          title: 'Locomotion',
          content: 'Locomotion #4 text content',
          color: '#d9d9d9',
          txtColor:'#333',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/feet_legs/locomotion',
          target: {
              type: 'view',
              view: 'traits',
              data: 'feet_legs/locomotion'
            }
          }
        ]
      },
    body_conformation: {
      name: 'body_conformation',
      parent: 'traits',
      items: [
        {
          idx: 0,
          title: 'Stature',
          content: 'Stature text content',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/body_conform/stature',
          target: {
              type: 'view',
              view: 'traits',
              data: 'body_conformation/stature'
            }
        },
        {
          idx: 1,
          title: 'Chest Width',
          content: 'Chest Width text content',
          color: '#d9d9d9',
          txtColor:'#333',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/body_conform/chest_width',
          target: {
              type: 'view',
              view: 'traits',
              data: 'body_conformation/chest_width'
            }
        },
        {
          idx: 2,
          title: 'Body Depth',
          content: 'Body Depth text content',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/body_conform/body_depth',
          target: {
              type: 'view',
              view: 'traits',
              data: 'body_conformation/body_depth'
            }
        },
        {
          idx: 3,
          title: 'Angularity',
          content: 'Angularity text content',
          color: '#d9d9d9',
          txtColor:'#333',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/body_conform/angularity',
          target: {
              type: 'view',
              view: 'traits',
              data: 'body_conformation/angularity'
            }
        },
        {
          idx: 4,
          title: 'Rump Angle',
          content: 'Rump Angle',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/body_conform/rump_angle',
          target: {
              type: 'view',
              view: 'traits',
              data: 'body_conformation/rump_angle'
            }
        },
        {
          idx: 5,
          title: 'Rump Width',
          content: 'Rump Width #6 text content',
          color: '#d9d9d9',
          txtColor:'#333',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/traits/body_conform/rump_width',
          target: {
              type: 'view',
              view: 'traits',
              data: 'body_conformation/rump_width'
          }
        }
      ]
    },
    dairy_strength: {
      name: 'dairy_strength',
      parent: 'traits',
      items: [
            {
              idx: 0,
              title: 'Dairy Strength #1',
              content: 'Dairy Strength #1 text content',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'video/test1.mp4',
              img_path: 'img/traits/dairy_strength/dairy_strength_1',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'dairy_strength/dairy_strength_1'
                }
            },
            {
              idx: 1,
              title: 'Dairy Strength #2',
              content: 'Dairy Strength #2 text content',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/dairy_strength/dairy_strength_2',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'dairy_strength/dairy_strength_2'
                }
            },
            {
              idx: 2,
              title: 'Dairy Strength #3',
              content: 'Dairy Strength #3 text content',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/dairy_strength/dairy_strength_3',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'dairy_strength/dairy_strength_3'
                }
            },
            {
              idx: 3,
              title: 'Dairy Strength #4',
              content: 'Dairy Strength #4 text content',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/dairy_strength/dairy_strength_4',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'dairy_strength/dairy_strength_4'
                }
            },
            {
              idx: 4,
              title: 'Dairy Strength #5',
              content: 'Dairy Strength #5 text content',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/traits/dairy_strength/dairy_strength_5',
              target: {
                  type: 'view',
                  view: 'traits',
                  data: 'dairy_strength/dairy_strength_5'
                }
            }
          ]
    },
    locomotion: {
      name: 'locomotion',
      parent: 'main',
      items: [
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
      ]
    },
    ideal_cow: {
      name: 'ideal_cow',
      parent: 'main',
      items: [
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
      ]
    },
  guide: {
    name: 'guide',
    parent: 'main',
    items: [
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
  }

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
];
