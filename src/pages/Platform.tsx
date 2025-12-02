/** @format */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarketStats from "../components/platform/MarketStats";
import FilterBar from "../components/platform/FilterBar";
import ProjectCard from "../components/platform/ProjectCard";
import ProjectModal from "../components/platform/ProjectModal";

const projects = [
  {
    id: 1,
    name: "云南普洱森林碳汇项目",
    location: "云南省普洱市",
    type: "造林碳汇",
    volume: "50,000 吨",
    price: 72.0,
    image: "https://picsum.photos/seed/carbon1/800/600",
    tags: ["VCS认证", "生物多样性保护"],
  },
  {
    id: 2,
    name: "大兴安岭林业固碳示范区",
    location: "黑龙江省大兴安岭",
    type: "森林经营",
    volume: "120,000 吨",
    price: 65.5,
    image: "https://picsum.photos/seed/carbon2/800/600",
    tags: ["CCER申请中", "国有林场"],
  },
  {
    id: 3,
    name: "福建三明竹林碳汇项目",
    location: "福建省三明市",
    type: "竹林碳汇",
    volume: "30,000 吨",
    price: 78.2,
    image: "https://picsum.photos/seed/carbon3/800/600",
    tags: ["精准扶贫", "高固碳率"],
  },
  {
    id: 4,
    name: "贵州黔东南生态修复项目",
    location: "贵州省黔东南州",
    type: "植被恢复",
    volume: "45,000 吨",
    price: 69.8,
    image: "https://picsum.photos/seed/carbon4/800/600",
    tags: ["乡村振兴", "水土保持"],
  },
];

export default function Platform() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.type === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='pt-20 min-h-screen bg-slate-50'
    >
      {/* 顶部数据概览 */}
      <MarketStats />

      {/* 交易列表区域 */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* 筛选工具栏 */}
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* 项目卡片网格 */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                openModal={openModal}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 交易详情模态框 */}
      <ProjectModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProject={selectedProject}
      />
    </motion.div>
  );
}
