/** @format */
import { Sprout, Zap, Heart, Palette, Landmark } from "lucide-react";
import { IMAGES } from "../constants/images";

export const stories = [
  {
    id: 1,
    location: "浙江安吉",
    title: "竹林变金山，村民增收新途径",
    quote:
      "自从加入了碳汇项目，我们村的万亩竹林不仅卖出了竹子，连空气都变成了钱。",
    author: "李村长",
    impact: "增收 230 万元/年",
  },
  {
    id: 2,
    location: "内蒙古塞罕坝",
    title: "荒漠化治理与碳中和的双赢",
    quote:
      "通过科学的林业管理，我们将沙地变成了绿洲，现在这些树木正在为全球降温。",
    author: "张林场主",
    impact: "固碳 50 万吨/年",
  },
  {
    id: 3,
    location: "云南普洱",
    title: "生物多样性保护的经济价值",
    quote: "碳汇交易让我们有资金去保护这里的珍稀动植物，生态环境越来越好了。",
    author: "王巡护员",

    impact: "保护面积 3 万公顷",
  },
];

export const projects = [
  {
    id: 1,
    name: "云南普洱森林碳汇项目",
    location: "云南省普洱市",
    type: "造林碳汇",
    volume: "50,000 吨",
    price: 72.0,
    tags: ["VCS认证", "生物多样性保护"],
  },
  {
    id: 2,
    name: "大兴安岭林业固碳示范区",
    location: "黑龙江省大兴安岭",
    type: "森林经营",
    volume: "120,000 吨",
    price: 65.5,

    tags: ["CCER申请中", "国有林场"],
  },
  {
    id: 3,
    name: "福建三明竹林碳汇项目",
    location: "福建省三明市",
    type: "竹林碳汇",
    volume: "30,000 吨",
    price: 78.2,

    tags: ["精准扶贫", "高固碳率"],
  },
  {
    id: 4,
    name: "贵州黔东南生态修复项目",
    location: "贵州省黔东南州",
    type: "植被恢复",
    volume: "45,000 吨",
    price: 69.8,

    tags: ["乡村振兴", "水土保持"],
  },
];

export const themes = [
  {
    title: "乡村振兴与农业农村现代化",
    icon: Sprout,
    color: "bg-green-100 text-green-600",
    desc: "推动农业产业升级，增加农民收入，实现农村现代化。",
    details:
      "通过引入碳汇交易机制，将“叶子”变“票子”，直接增加村集体和农户收入。",
  },
  {
    title: "科技创新和未来产业",
    icon: Zap,
    color: "bg-blue-100 text-blue-600",
    desc: "AI遥感、大数据与区块链技术赋能传统林业。",
    details: "构建空天地一体化监测网络，推动传统林业向数字林业转型升级。",
  },
  {
    title: "生态文明建设和绿色低碳发展",
    icon: Heart,
    color: "bg-emerald-100 text-emerald-600",
    desc: "践行“绿水青山就是金山银山”理念，促进碳中和。",
    details: "建立生态产品价值实现机制，让保护生态的人不吃亏、能受益。",
  },
  {
    title: "文化创意和区域交流合作",
    icon: Palette,
    color: "bg-purple-100 text-purple-600",
    desc: "挖掘乡村生态文化价值，促进城乡要素双向流动。",
    details: "结合生态旅游与研学教育，传播绿色低碳生活方式。",
  },
  {
    title: "社会治理和公共服务",
    icon: Landmark,
    color: "bg-orange-100 text-orange-600",
    desc: "提升乡村数字化治理水平，完善公共服务体系。",
    details: "利用数字技术提升乡村治理效能，构建共建共治共享的社会治理格局。",
  },
];
