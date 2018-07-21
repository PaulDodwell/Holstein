
var txtDesc = {
  menus: {
    main: [
      "Holstein UK is Europe’s largest independent breed society. It offers a range of services to the dairy farming industry targeted at improving the genetics and profitability of the Holstein breed.",
      "British Friesians continue to be registered in the herdbook with percentages of Friesian clearly denoted. Breed societies have traditionally been associated with registering births and ancestry, promoting the breed, and increasing the value of your livestock.",
      "But at Holstein UK, this is just the tip of the iceberg. Over the past decade, the Society has built up a portfolio of services designed to improve your breeding decisions along with the quality, profitability and herd-life of your dairy cows."
    ],
    traits: [
      "Holstein UK is Europe’s largest independent breed society. It offers a range of services to the dairy farming industry targeted at improving the genetics and profitability of the Holstein breed.",
      "British Friesians continue to be registered in the herdbook with percentages of Friesian clearly denoted. Breed societies have traditionally been associated with registering births and ancestry, promoting the breed, and increasing the value of your livestock.",
      "But at Holstein UK, this is just the tip of the iceberg. Over the past decade, the Society has built up a portfolio of services designed to improve your breeding decisions along with the quality, profitability and herd-life of your dairy cows."
    ],
    mammary: [
      "Historically, cattle udders possessed greater similarities to those of deer or elks, being located in a more anterior position and attached solely to the abdominal wall. However increased production selection has altered the anatomical structure, causing the udders centre of gravity to move more posteriorly, with increased suspensory apparatus provided through support tissues attached to the pelvic floor.",
      "Therefore any udder conformation analysis should comprise of a comprehensive depiction of the suspensory apparatus due to their associations and importance in regards to udder health and cow longevity. Teat quality and position should obtain equal emphasis on both the rear and side views whilst the quantity of udder in relation to the size of animal, stage of lactation and time of inspection are considered.",
      "A desirable udder should possess a central ligament and fore and rear udder attachments that are wide and strong, with udder size comprising of length and width, not solely depth as the latter is often associated with pendulous udders."
    ],
    feet_legs: [
      "Complex cooperative efforts of muscles, tendons, ligaments and bones of the locomotor system enable the functionality of movement. Cattle Legs and Feet also serve as supportive weight-bearing structures; with feet tissues absorbing the majority of movement associated impact.",
      "Therefore optimum feet and leg conformation consists of straight, distant front legs, proving good chest width for strong heart and capacious lung accommodation, with rear legs desirably strong, straight from the rear view and almost perpendicular from hock to pastern when examined from the side.",
      "Feet and leg anatomy is closely linked to the cows ability to walk fluidly, which is assessed by the animals locomotion."
    ],
    body_conformation: [
      "Holsteins have long been recognised for their body capacity and dairyness, resulting from well-sprung open ribs and unique combinations of body depth and angularity, enabling strong, capacious organ accommodation and vast forage consumption and processing for intense milk production sustainability.",
      "Body size, form and weight alterations also affect animal movement, by the total space required and the scale of forces exerted in free movement execution. Therefore alterations in body conformation scores have a direct impact on her environmental and spatial requirements."
    ],
    dairy_strength: [
      "Temporary text - Holsteins have long been recognised for their body capacity and dairyness, resulting from well-sprung open ribs and unique combinations of body depth and angularity, enabling strong, capacious organ accommodation and vast forage consumption and processing for intense milk production sustainability.",
      "Body size, form and weight alterations also affect animal movement, by the total space required and the scale of forces exerted in free movement execution. Therefore alterations in body conformation scores have a direct impact on her environmental and spatial requirements."
    ]
  },
  traits: {
	  angularity: {
          main_text: 'The spring of the ribs or the degree of openness between the ribs.',
          scores_text: [
            {
              score: '1',
              desc: 'No spring and close ribbed'
            },
            {
              score: '9',
              desc: 'Well sprung and open ribbed'
            }
          ],
          footer_text: 'Reference point: When the ribs are tight there is no opening. When the ribs spring apart or expand open, the space between the ribs becomes wider.'
      },
	  body_depth: {
          main_text: 'The distance between the top of the spine and the bottom of the barrel as the last rib – The deepest point, independent of stature.',
          scores_text: [
            {
              score: '1-3 = Shallow',
              desc: ''
            },
            {
              score: '4-6 = Intermediate',
              desc: ''
            },
            {
              score: '7-9 = Deep',
              desc: ''
            }
          ],
          footer_text: 'Reference Scale: This measure is optical in relation to the balance of the animal. Ensure scoring is always conducted from the same side, because all cows are deeper on one side than the other.'
      },
      bone_quality: {
            main_text: 'The descriptive text for bone quality trait',
            scores_text: [
              {
                score: '1-3 = Low',
                desc: ''
              },
              {
                score: '4-6 = Intermediate',
                desc: ''
              },
              {
                score: '7-9 = High',
                desc: ''
              }
            ],
            footer_text: 'Footer reference text for bone quality trait'
        },
	  chest_width: {
        main_text: 'Measured from the inside surface between the top of the front legs.',
        scores_text: [
          {
            score: '1-3 = Narrow',
            desc: ''
          },
          {
            score: '4-6 Intermediate',
            desc: ''
          },
          {
            score: '7-9 Wide',
            desc: ''
          }
        ],
        footer_text: 'Reference Scale: 13cm – 29cm; 2cm per point'
      },
	  foot_angle: {
        main_text: 'The angle at the front of the rear hoof , measure from the floor to the hairline at the right hoof.',
        scores_text: [
          {
            score: '1-3 = Very low angle',
            desc: '(15 degrees)'
          },
          {
            score: '4-6 = Intermediate angle',
            desc: '(45 degrees)'
          },
          {
            score: '7-9 Very steep',
            desc: '(65 degrees)'
          }
        ],
        footer_text: 'If the foot angle is difficult to score because of hoof trimming, bedding, manure etc. it is possible to look at the angle of the hairline. In case of a significant difference the worst/extreme side must be scored.'
      },
	  fore_udder_attachment: {
        main_text: 'The strength of the fore udder attachment to the abdominal wall; not a true linear trait.',
        scores_text: [
          {
            score: '1-3 = Weak and loose',
            desc: ''
          },
          {
            score: '4-6 = Intermediate acceptable',
            desc: ''
          },
          {
            score: '7-9 = Extremely strong and tight',
            desc: ''
          }
        ],
        footer_text: 'If the udder is healthy, but a significant difference in attachment is seen on either side, then the worst side must be scored.'
      },
	  front_teat_placement: {
        main_text: 'The position of the front teat from the centre of the quarter as viewed from the rear.',
        scores_text: [
          {
            score: '1-3 = Outside of the quarter',
            desc: ''
          },
          {
            score: '4-6 = Middle of the quarter',
            desc: ''
          },
          {
            score: '7-9 = Inside of the quarter',
            desc: ''
          }
        ],
        footer_text: ''
      },
	  locomotion: {
        main_text: 'Locomotion is a qualitative assessment of a cow’s ability to walk normally. Normal locomotion is defined as the animal’s ability to walk with long fluid strides, taking into account the flexibility of the hock and pastern joints, with rear hooves placed in the same sides front foot imprint. Animals whose hooves are placed outside this region are diagnosed as lame. When walking, the use of legs, feet, length and direction of the step. Not a true linear trait.',
        scores_text: [
          {
            score: '1-3 = Severe abduction*',
            desc: 'and/or Short Stride'
          },
          {
            score: '4-6 = Slight abduction*',
            desc: 'and Medium Stride'
          },
          {
            score: '7-9 = No Abduction*',
            desc: 'and Long Stride'
          }
        ],
        footer_text: '*Abduction – The spreading out of the legs to the side of the body, and away from the medial line (centre of the body).'
      },
	  rear_legs_rear_view: {
        main_text: 'The angle of the rear leg toes in relation to the medial body line of the animal, considering the distance between the hocks.',
        scores_text: [
          {
            score: '1',
            desc: 'Severely outwardly pointing toes with hocks touching'
          },
          {
            score: '5',
            desc: 'Slight toe out with hocks marginally further apar'
          },
          {
            score: '9',
            desc: 'Feet and hocks straight/parallel with the medial body line'
          }
        ],
        footer_text: ''
      },
      rear_legs_side_view: {
        main_text: 'The angle measured at the front of the hock',
        scores_text: [
          {
            score: '1-3 Straight',
            desc: '(160 degrees)'
          },
          {
            score: '4-6 Intermediate',
            desc: '(147 degrees)'
          },
          {
            score: '7-9 Sickle',
            desc: '(134 degrees)'
          }
        ],
        footer_text: 'In the case of a significant difference between sides, the worst/extreme side must be scored.'
      },
	  rear_teat_placement: {
        main_text: 'The position of the rear teat from the centre of the quarter as viewed from the rear.',
        scores_text: [
          {
            score: '1-3 = Outside of the quarter',
            desc: ''
          },
          {
            score: '4-7 = Middle of the quarter',
            desc: ''
          },
          {
            score: '8 = Touching',
            desc: ''
          },
          {
            score: '9 = Crossing',
            desc: ''
          }
        ],
        footer_text: 'To obtain population distribution it is recommended that 4 represents the mid-point of the quarter.'
      },
	  rear_udder_height: {
        main_text: 'The distance between the bottom of the vulva (pin bone) and the milk secreting tissue, scored in relation to the height of the animal.',
        scores_text: [
          {
            score: '1-3 = Very low',
            desc: ''
          },
          {
            score: '4-6 Intermediate',
            desc: ''
          },
          {
            score: '7-9 = High',
            desc: ''
          }
        ],
        footer_text: 'Measured on a scale between the bottom of the vulva and the hock. 1= 21cm, 9= 39cm (2cm per point)'
      },
	   rear_udder_width: {
        main_text: 'The width of the milk secreting tissue at the top of the rear udder.',
        scores_text: [
          {
            score: '1 = Very narrow',
            desc: '(8cm wide)'
          },
          {
            score: '5 = Intermediate',
            desc: '(16cm wide)'
          },
          {
            score: '9 = Wide',
            desc: '(24cm wide)'
          }
        ],
        footer_text: 'Reference Scale: 2cm per point'
      },
      rump_angle: {
          main_text: 'Measured as the angle of the rump structure from the hips (hooks) to the pins.',
          scores_text: [
            {
              score: '1 = High Pins',
              desc: '(+4cm)'
            },
            {
              score: '3 = Level',
              desc: '(0cm)'
            },
            {
              score: '9 = Extreme',
              desc: '(-12cm)'
            }
          ],
          footer_text: 'Reference point: from 1(+4cm) remove 2 point for every score.'
      },
	  rump_width: {
          main_text: 'The distance between the most posterior point of the pin bones.',
          scores_text: [
            {
              score: '1-3 = Narrow',
              desc: ''
            },
            {
              score: '4-6 = Intermediate',
              desc: ''
            },
            {
              score: '7-9 = Wide',
              desc: ''
            }
          ],
          footer_text: 'Reference Scale: 10cm – 26cm; 2cm per point.'
      },
	  stature: {
          main_text: 'Heifers are measured from the top of the spine in between the hips to the ground, second lactation+ cows are measured from the withers.',
          scores_text: [
            {
              score: '1 = Short',
              desc: '(136cm)'
            },
            {
              score: '5 = Intermediate',
              desc: '(148cm)'
            },
            {
              score: '9 = Tall',
              desc: '(160cm)'
            }
          ],
          footer_text: 'Reference Scale: 136 cm – 160 cm; 3cm per point.'
      },
	   teat_length: {
        main_text: 'The length of the front OR rear teat.',
        scores_text: [
          {
            score: '1-3 = Short',
            desc: ''
          },
          {
            score: '4-6 = Intermediate',
            desc: ''
          },
          {
            score: '7-9 = Long',
            desc: ''
          }
        ],
        footer_text: 'Reference Scale: 1cm per point by front teat and 0.75cm by rear teat'
      },
	  teat_placement_side_view: {
        main_text: 'The distance between the front and rear teats as observed from the side of the animal.',
        scores_text: [
          {
            score: '1-3 = Close',
            desc: ''
          },
          {
            score: '4-6 = Intermediate',
            desc: ''
          },
          {
            score: '7-9 = Far apart',
            desc: ''
          }
        ],
        footer_text: 'This measure is unique to the UK.'
      },
	  udder_depth: {
        main_text: 'The distance from the lowest part of the udder floor to the hock.',
        scores_text: [
          {
            score: '1 = Below the hock',
            desc: ''
          },
          {
            score: '2 = Level with the hock',
            desc: ''
          },
          {
            score: '5 = Intermediate',
            desc: ''
          },
          {
            score: '9 = Shallow',
            desc: ''
          }
        ],
        footer_text: 'Reference scale: 2 = (0cm); 3cm per point'
      },
	    udder_support: {
        main_text: 'The depth of the cleft/ligament, measured at the base of the rear udder.',
        scores_text: [
          {
            score: '1 = Convex to flat floor',
            desc: '(+1cm)'
          },
          {
            score: '2',
            desc: '(0.5cm)'
          },
          {
            score: '3',
            desc: '(+0cm)'
          },
          {
            score: '4 = Slight definition',
            desc: '(-1cm)'
          },
          {
            score: '5',
            desc: '(-2cm)'
          },
          {
            score: '6',
            desc: '(-3cm)'
          },
          {
            score: '7 = Deep definition',
            desc: '(-4cm)'
          },
          {
            score: '8',
            desc: '(-5cm)'
          },
          {
            score: '9',
            desc: '(-6cm)'
          }
        ],
        footer_text: ''
      },
      udder_texture: {
          main_text: 'This is the descriptive text for udder texture.',
          scores_text: [
            {
              score: '1-3 = texture 1',
              desc: ''
            },
            {
              score: '4-6 = texture 2',
              desc: ''
            },
            {
              score: '7-9 = texture 3',
              desc: ''
            }
          ],
          footer_text: 'This is the footer text for udder texture'
        }
    }

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



var navMenus = {
    main: {
      name: 'main',
      parent: 'main',
      title: 'Holstein Virtual Cow',
      desc: {
        heading: 'Holstein Virtual Cow',
        paras: txtDesc.menus.main
      },
      icons_show: true,
      items: [
        {
            idx: 0,
            title: 'Traits',
            content: 'Traits text content',
            icon: 'img/icons/icon_traits_wh.png',
            color: '#1C3764',
            txtColor:'#fff',
            target: {
              type: 'menu',
              innerMenu: 'traits',
              outerMenu: 'main',
            }
          },
          {
            idx: 1,
            title: 'Guide',
            content: 'Guide text content',
            icon: 'img/icons/icon_guide_bl.png',
            color: '#9FABCD',
            txtColor:'#333',
            target: {
              type: 'url',
              view: 'guide',
              route: 'pdf/type_classification_guide.pdf'
              }
          },
          {
            idx: 2,
            title: 'Ideal Cow',
            content: 'Ideal Cow text content',
            icon: 'img/icons/icon_ideal_cow_wh.png',
            color: '#C7BC52',
            txtColor:'#fff',
            target: {
              type: 'view',
              view: 'ideal-cow',
              route: ''
              }
            }
          ]
        },
    traits: {
      name: 'traits',
      parent: 'main',
      title: 'Individual Traits',
      desc: {
        heading: 'Individual Traits',
        paras: txtDesc.menus.traits
      },
      icons_show: true,
      items: [
        {
          idx: 0,
          title: 'Mammary',
          content: 'Mammary text content',
          icon: 'img/icons/icon_mammary_wh.png',
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
          title: 'Legs & Feet',
          content: 'Legs & Feet text content',
          icon: 'img/icons/icon_feet_legs_bl.png',
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
          icon: 'img/icons/icon_body_conformation_bl.png',
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
          icon: 'img/icons/icon_dairy_strength_wh.png',
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
      title: 'Mammary',
      desc: {
        heading: 'Mammary',
        paras: txtDesc.menus.mammary
      },
      icons_show: false,
      items: [
        {
          idx: 0,
          title: 'Teat Traits',
          content: 'Teat Traits text content',
          icon: 'img/icons/icon_blank.png',
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
          icon: 'img/icons/icon_blank.png',
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
        title: 'Udder Traits',
        desc: {
          heading: 'Mammary',
          paras: txtDesc.menus.mammary
        },
        icons_show: false,
        items: [
            {
              idx: 0,
              title: 'Fore Udder Attachment',
              name: 'fore_udder_attachment',
              content: txtDesc.traits.fore_udder_attachment,
              icon: 'img/icons/icon_blank.png',
              color: '#1C3764',
              txtColor: '#fff',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'udder_traits/fore_udder_attachment'
                }
            },
            {
              idx: 1,
              title: 'Rear Udder Height',
              name: 'rear_udder_height',
              content: txtDesc.traits.rear_udder_height,
              icon: 'img/icons/icon_blank.png',
              color: '#d9d9d9',
              txtColor:'#333',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'udder_traits/rear_udder_height'
                }
            },
            {
              idx: 2,
              title: 'Udder Support',
              name: 'udder_support',
              content: txtDesc.traits.udder_support,
              icon: 'img/icons/icon_blank.png',
              color: '#1C3764',
              txtColor: '#fff',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'udder_traits/udder_support'
                }
            },
            {
              idx: 3,
              title: 'Udder Texture',
              name: 'udder_texture',
              content: txtDesc.traits.udder_texture,
              icon: 'img/icons/icon_blank.png',
              color: '#d9d9d9',
              txtColor:'#333',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'udder_traits/udder_texture'
                }
            }
        ]
      },
      teat_traits: {
        name: 'teat_traits',
        parent: 'mammary',
        title: 'Teat Traits',
        desc: {
          heading: 'Mammary',
          paras: txtDesc.menus.mammary
        },
        icons_show: false,
        items: [
            {
              idx: 0,
              title: 'Front Teat Placement',
              name: 'front_teat_placement',
              content: txtDesc.traits.front_teat_placement,
              icon: 'img/icons/icon_blank.png',
              color: '#1C3764',
              txtColor: '#fff',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'teat_traits/front_teat_placement'
                }
            },
            {
              idx: 1,
              title: 'Rear Teat Placement',
              name: 'rear_teat_placement',
              content: txtDesc.traits.rear_teat_placement,
              icon: 'img/icons/icon_blank.png',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'teat_traits/rear_teat_placement'
                }
            },
            {
              idx: 2,
              title: 'Teat Placement Side View',
              name: 'teat_placement_side_view',
              content: txtDesc.traits.teat_placement_side_view,
              icon: 'img/icons/icon_blank.png',
              color: '#1C3764',
              txtColor: '#fff',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'teat_traits/teat_placement_side_view'
                }
            },
            {
              idx: 3,
              title: 'Teat Length',
			  name: 'teat_length',
              content: txtDesc.traits.teat_length,
              icon: 'img/icons/icon_blank.png',
              name: 'teat_length',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'teat_traits/teat_length'
                }
            }
          ]
      },
    feet_legs: {
      name: 'feet_legs',
      parent: 'traits',
      title: 'Legs and Feet',
      desc: {
        heading: 'Legs & Feet',
        paras: txtDesc.menus.feet_legs
      },
      icons_show: false,
      items: [
        {
          idx: 0,
          title: 'Rear Legs Side View',
          name: 'rear_legs_side_view',
          content: txtDesc.traits.rear_legs_side_view,
          icon: 'img/icons/icon_blank.png',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'rear_legs_side_view_01.png',
          img_path: 'img/trait',
          target: {
              type: 'view',
              view: 'traits',
              route: 'feet_legs/rear_legs_side_view'
            }
        },
        {
          idx: 1,
          title: 'Rear Legs Rear View',
          name: 'rear_legs_rear_view',
          content: txtDesc.traits.rear_legs_rear_view,
          icon: 'img/icons/icon_blank.png',
          color: '#d9d9d9',
          txtColor:'#333',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/trait',
          target: {
              type: 'view',
              view: 'traits',
              route: 'feet_legs/rear_legs_rear_view'
            }
        },
        {
          idx: 2,
          title: 'Bone Quality',
          name: 'bone_quality',
          content: txtDesc.traits.bone_quality,
          icon: 'img/icons/icon_blank.png',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/trait',
          target: {
              type: 'view',
              view: 'traits',
              route: 'feet_legs/bone_quality'
            }
        },
        {
          idx: 3,
          title: '',
          name: 'legs_feet_blank',
          content: '',
          icon: 'img/icons/icon_blank.png',
          color: '#D9D9D9',
          txtColor: '#333',
          vid_src: '',
          main_img: '',
          img_path: '',
          target: {
              type: 'blank',
              view: '',
              route: ''
            }
        },
        {
          idx: 4,
          title: 'Foot Angle',
          name: 'foot_angle',
          content: txtDesc.traits.foot_angle,
          icon: 'img/icons/icon_blank.png',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/trait',
          target: {
              type: 'view',
              view: 'traits',
              route: 'feet_legs/foot_angle'
            }
        },
          {
            idx: 5,
            title: 'Locomotion',
            name: 'locomotion',
            content: txtDesc.traits.locomotion,
            icon: 'img/icons/icon_blank.png',
            color: '#D9D9D9',
            txtColor:'#333',
            vid_src: 'video/test1.mp4',
            main_img: 'img/Trait_17_00035.jpg',
            img_path: 'img/trait',
            target: {
                type: 'view',
                view: 'locomotion',
                route: ''
              }
            }
        ]
      },
    body_conformation: {
      name: 'body_conformation',
      parent: 'traits',
      title: 'Body Conformation',
      desc: {
        heading: 'Body Conformation',
        paras: txtDesc.menus.body_conformation
      },
      icons_show: false,
      items: [
        {
          idx: 0,
          title: 'Stature',
          name: 'stature',
          content: txtDesc.traits.stature,
          icon: 'img/icons/icon_blank.png',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/trait',
          target: {
              type: 'view',
              view: 'traits',
              route: 'body_conformation/stature'
            }
        },
        {
          idx: 1,
          title: 'Body Depth',
          name: 'body_depth',
          content: txtDesc.traits.body_depth,
          icon: 'img/icons/icon_blank.png',
          color: '#D9D9D9',
          txtColor: '#333',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/trait',
          target: {
              type: 'view',
              view: 'traits',
              route: 'body_conformation/body_depth'
            }
        },
        {
          idx: 2,
          title: 'Rump Angle',
          name: 'rump_angle',
          content: txtDesc.traits.rump_angle,
          icon: 'img/icons/icon_blank.png',
          color: '#1C3764',
          txtColor: '#fff',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/trait',
          target: {
              type: 'view',
              view: 'traits',
              route: 'body_conformation/rump_angle'
            }
        },
        {
          idx: 3,
          title: 'Rump Width',
          name: 'rump_width',
          content:  txtDesc.traits.rump_width,
          icon: 'img/icons/icon_blank.png',
          color: '#D9D9D9',
          txtColor:'#333',
          vid_src: 'video/test1.mp4',
          main_img: 'img/Trait_17_00035.jpg',
          img_path: 'img/trait',
          target: {
              type: 'view',
              view: 'traits',
              route: 'body_conformation/rump_width'
          }
        }
      ]
    },
    dairy_strength: {
      name: 'dairy_strength',
      parent: 'traits',
      title: 'Dairy Strength',
      desc: {
        heading: 'Dairy Strength',
        paras: txtDesc.menus.dairy_strength
      },
      icons_show: false,
      items: [
            {
              idx: 0,
              title: 'Chest Width',
              name: 'chest_width',
              content:  txtDesc.traits.chest_width,
              icon: 'img/icons/icon_blank.png',
              color: '#1C3764',
              txtColor:'#fff',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'dairy_strength/chest_width'
                }
            },
            {
              idx: 1,
              title: 'Angularity',
              name: 'angularity',
              content:  txtDesc.traits.angularity,
              icon: 'img/icons/icon_blank.png',
              color: '#d9d9d9',
              txtColor:'#333',
              vid_src: 'video/test1.mp4',
              main_img: 'img/Trait_17_00035.jpg',
              img_path: 'img/trait',
              target: {
                  type: 'view',
                  view: 'traits',
                  route: 'dairy_strength/angularity'
                }
            }
          ]
    },
    locomotion: {
      name: 'locomotion',
      parent: 'main',
      title: 'Locomotion',
      icons_show: false,
      items: [
        {
        idx: 0,
        title: 'Locomotion',
        name: 'locomotion',
        content: txtDesc.traits.locomotion,
        icon: 'img/icons/icon_blank.png',
        color: '#D9D9D9',
        txtColor:'#333',
        vid_src: 'video/locomotion_low.mp4',
        img_path: 'img/trait',
        target: {
            type: 'view',
            view: '',
            route: 'locomotion'
          }
        },
        {
        idx: 1,
        title: 'Locomotion',
        name: 'locomotion',
        content: txtDesc.traits.locomotion,
        icon: 'img/icons/icon_blank.png',
        color: '#D9D9D9',
        txtColor:'#333',
        vid_src: 'video/locomotion_intermediate.mp4',
        img_path: 'img/trait',
        target: {
            type: 'view',
            view: '',
            route: 'locomotion'
          }
        },
        {
        idx: 2,
        title: 'Locomotion',
        name: 'locomotion',
        content: txtDesc.traits.locomotion,
        icon: 'img/icons/icon_blank.png',
        color: '#D9D9D9',
        txtColor:'#333',
        vid_src: 'video/locomotion_high.mp4',
        img_path: 'img/trait',
        target: {
            type: 'view',
            view: '',
            route: 'locomotion'
          }
        }
      ]
    },
    ideal_cow: {
      name: 'ideal_cow',
      parent: 'main',
      title: 'Ideal Cow',
      icons_show: false,
      items: [
        {
          idx: 0,
          title: 'Ideal Cow 1',
          name: 'ideal_cow_1',
          content: 'Ideal Cow 1 text content',
          icon: 'img/icons/icon_blank.png',
          color: '#1C3764',
          target: {
              type: 'view',
              view: 'ideal_cow',
              route: 'ideal_cow_1'
            }
        },
        {
          idx: 1,
          title: 'Ideal Cow 2',
          name: 'ideal_cow_2',
          content: 'Ideal Cow 2 text content',
          icon: 'img/icons/icon_blank.png',
          color: '#D9D9D9',
          target: {
              type: 'view',
              view: 'ideal_cow',
              route: 'ideal_cow_2'
            }
        }
      ]
    },
  guide: {
    name: 'guide',
    parent: 'main',
    title: 'Guide',
    icons_show: false,
    items: [
      {
        idx: 0,
        title: 'Guide 1',
        name: 'guide_1',
        content: 'Guide 1 text content',
        icon: 'img/icons/icon_blank.png',
        color: '#1C3764',
        target: {
            type: 'view',
            view: 'guide',
            route: 'guide_1'
          }
      },
      {
        idx: 1,
        title: 'Guide 2',
        name: 'guide_2',
        content: 'Guide 2 text content',
        icon: 'img/icons/icon_blank.png',
        color: '#D9D9D9',
        target: {
            type: 'view',
            view: 'guide',
            route: 'guide_2'
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
  innerCircleR: 120,
  outerCircleR: 380,
  activeSliceR: 380,
  activeSliceIdx: 3,
  activeSliceFill: '#a00',
  navTxtTitleColor: '#fff',
  navTxtTitleSize: '1.8em',
  defaultCenterImg: 'img/Trait_17_00035.jpg',
  backArrowImg: 'img/icons/back_arrow.png',
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

var ideal_cow = {
  path: 'data/new_deer02.json',
  xOffset: -50,
  yOffset: 40,
  zOffset: 0,
  xRot: -3,
  yRot: 0,
  zRot: 0,
  scale:5,
  camZ: 200
}
