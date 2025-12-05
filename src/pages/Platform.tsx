/** @format */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarketStats from "../components/platform/MarketStats";
import FilterBar from "../components/platform/FilterBar";
import ProjectCard from "../components/platform/ProjectCard";
import ProjectModal from "../components/platform/ProjectModal";
import { projects } from "../data/story_success";
import { toast } from "sonner";

interface Project {
  id: number;
  name: string;
  location: string;
  type: string;
  volume: string;
  price: number;
  tags: string[];
  farmerExpectation?: string;
}

export default function Platform() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.type === selectedCategory);
  useEffect(function () {
    toast.warning("本页面数据均为展示使用，目前还未实际投入使用");
  }, []);
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
