/** @format */

export const PROVINCES = [
  {
    name: "云南省",
    cities: [
      {
        name: "普洱市",
        districts: [
          "思茅区",
          "宁洱哈尼族彝族自治县",
          "墨江哈尼族自治县",
          "景东彝族自治县",
        ],
      },
      {
        name: "昆明市",
        districts: ["五华区", "盘龙区", "官渡区", "西山区"],
      },
    ],
  },
  {
    name: "浙江省",
    cities: [
      {
        name: "湖州市",
        districts: ["吴兴区", "南浔区", "德清县", "长兴县", "安吉县"],
      },
      {
        name: "杭州市",
        districts: ["上城区", "拱墅区", "西湖区", "滨江区"],
      },
    ],
  },
  {
    name: "福建省",
    cities: [
      {
        name: "三明市",
        districts: ["三元区", "沙县区", "尤溪县", "大田县"],
      },
      {
        name: "龙岩市",
        districts: ["新罗区", "永定区", "长汀县", "上杭县"],
      },
    ],
  },
];

export const TREE_TYPES = [
  {
    label: "造林碳汇",
    method: "CM-001-V01 造林和再造林碳汇项目方法学",
    factor: 5,
  },
  {
    label: "森林经营",
    method: "CM-003-V01 森林经营碳汇项目方法学",
    factor: 3.5,
  },
  {
    label: "竹林碳汇",
    method: "CM-005-V01 竹林经营碳汇项目方法学",
    factor: 6.2,
  },
  {
    label: "草地碳汇",
    method: "CM-007-V01 草地经营碳汇项目方法学",
    factor: 2.1,
  },
];
