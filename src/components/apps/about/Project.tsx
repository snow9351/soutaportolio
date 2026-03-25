/* eslint-disable @next/next/no-img-element */
"use client";

import { STATUS_STRIP_HEIGHT_PX } from "@/config/layout";
import { projectList } from "@/config/projectList";
import type { Project as ProjectType } from "@/types/project";
import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";

type SortOption = "newest" | "oldest" | "priority" | "title";
type FilterCategory = "all" | "personal" | "client-work";

const Projects = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [imageIndexByProject, setImageIndexByProject] = useState<Record<number, number>>({});
  const [lightbox, setLightbox] = useState<{ open: boolean; projectIndex: number | null; imageIndex: number }>(
    { open: false, projectIndex: null, imageIndex: 0 }
  );

  const projectTypes = ["all", "mobile", "web", "Trading bots", "ai"];

  // Memoized filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let filtered = projectList.filter((project) => {
      // Type filter
      const typeMatch = selectedType === "all" || project.type?.toLowerCase() === selectedType.toLowerCase();
      
      // Category filter
      const categoryMatch = selectedCategory === "all" || project.category === selectedCategory;
      
      // Search filter
      const searchMatch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return typeMatch && categoryMatch && searchMatch;
    });

    // Sort projects
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          // Extract year from period, default to 0 if not found
          const getYear = (period?: string) => {
            if (!period) return 0;
            const match = period.match(/\d{4}/);
            return match ? parseInt(match[0]) : 0;
          };
          return getYear(b.period) - getYear(a.period);
        case "oldest":
          const getYearOldest = (period?: string) => {
            if (!period) return 9999;
            const match = period.match(/\d{4}/);
            return match ? parseInt(match[0]) : 9999;
          };
          return getYearOldest(a.period) - getYearOldest(b.period);
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const aPriority = priorityOrder[a.priority || "low"] || 0;
          const bPriority = priorityOrder[b.priority || "low"] || 0;
          return bPriority - aPriority;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedType, selectedCategory, searchQuery, sortBy]);

  const renderTypeIcon = (type?: string) => {
    if (!type) return null;
    const normalized = type.toLowerCase();
    switch (normalized) {
      case "mobile":
        return <Image src="/images/projects/mobile.svg" alt="Mobile" width={20} height={20} className="w-8 h-8" />;
      case "web":
        return <Image src="/images/projects/web.svg" alt="Web" width={20} height={20} className="w-8 h-8" />;
      case "trading":
        return <Image src="/images/projects/chart.svg" alt="Chart" width={20} height={20} className="w-8 h-8" />;
      case "3d":
        return <Image src="/images/projects/game.svg" alt="3D" width={20} height={20} className="w-8 h-8" />;
      case "ai":
        return <Image src="/images/projects/ai.svg" alt="AI" width={20} height={20} className="w-8 h-8" />;
      default:
        return null;
    }
  };

  const getProjectLink = (project: ProjectType): string | undefined => {
    if (project.link) {
      if (typeof project.link === 'string') {
        return project.link;
      } else if (Array.isArray(project.link)) {
        const iosLink = project.link.find((link) => link.ios)?.ios;
        const androidLink = project.link.find((link) => link.android)?.android;
        return iosLink || androidLink || Object.values(project.link[0] || {})[0];
      }
    }
    return undefined;
  };

  const getProjectImages = (project: ProjectType): string[] => {
    if (project?.images && Array.isArray(project.images) && project.images.length > 0) {
      // Some entries in `projectList` contain accidental trailing spaces; trim so
      // image URLs don't become invalid (404) for Next/Image.
      return project.images.map((p) => (typeof p === "string" ? p.trim() : p)).filter(Boolean) as string[];
    }
    if (project?.image) return [typeof project.image === "string" ? project.image.trim() : project.image];
    return [];
  };

  const getCurrentImageForProject = (project: ProjectType, projectIndex: number) => {
    const images = getProjectImages(project);
    if (images.length === 0) return null;
    const currentIndex = imageIndexByProject[projectIndex] ?? 0;
    return images[currentIndex % images.length];
  };

  const goToNextImage = useCallback((project: ProjectType, projectIndex: number) => {
    const images = getProjectImages(project);
    if (images.length <= 1) return;
    setImageIndexByProject(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] ?? 0) + 1) % images.length,
    }));
  }, []);

  const goToPrevImage = useCallback((project: ProjectType, projectIndex: number) => {
    const images = getProjectImages(project);
    if (images.length <= 1) return;
    setImageIndexByProject(prev => ({
      ...prev,
      [projectIndex]: (images.length + (prev[projectIndex] ?? 0) - 1) % images.length,
    }));
  }, []);

  const openLightbox = (projectIndex: number, imageIndex: number) => {
    setLightbox({ open: true, projectIndex, imageIndex });
  };

  const closeLightbox = () => setLightbox({ open: false, projectIndex: null, imageIndex: 0 });

  const lightboxNext = useCallback(() => {
    if (lightbox.projectIndex === null) return;
    const project = filteredProjects[lightbox.projectIndex];
    const images = getProjectImages(project);
    if (images.length === 0) return;
    setLightbox(lb => ({ ...lb, imageIndex: (lb.imageIndex + 1) % images.length }));
  }, [filteredProjects, lightbox.projectIndex]);

  const lightboxPrev = useCallback(() => {
    if (lightbox.projectIndex === null) return;
    const project = filteredProjects[lightbox.projectIndex];
    const images = getProjectImages(project);
    if (images.length === 0) return;
    setLightbox(lb => ({ ...lb, imageIndex: (images.length + lb.imageIndex - 1) % images.length }));
  }, [filteredProjects, lightbox.projectIndex]);

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'ArrowLeft') lightboxPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open, lightboxNext, lightboxPrev]);

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    const colors = {
      high: "bg-red-500/20 text-red-300 border-red-500/30",
      medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      low: "bg-blue-500/20 text-blue-300 border-blue-500/30"
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded border ${colors[priority as keyof typeof colors] || colors.low}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center text-white p-4 md:p-6 overflow-y-auto">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="font-medium relative text-2xl md:text-3xl mt-2 md:mt-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Projects
            </span>
            <div className="flex items-center gap-4 text-sm font-normal text-gray-400">
              <span>
                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="absolute pt-px bg-gradient-to-r from-transparent via-white to-transparent mt-2 top-full w-full">
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects by name, tech, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              aria-label="Search projects"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Type Filter */}
          <div className="flex flex-wrap gap-2 flex-1">
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedType === type
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:scale-105"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {(["all", "personal", "client-work"] as FilterCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-purple-600/80 text-white"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                {category === "client-work" ? "Client" : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 rounded-lg text-sm bg-gray-800/50 text-gray-300 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            aria-label="Sort projects"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project: ProjectType, index: number) => (
            <div
              key={`${project.title}-${index}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Priority badge */}
              {project.priority && (
                <div className="absolute top-3 right-3 z-10">
                  {getPriorityBadge(project.priority)}
                </div>
              )}

              <div className="p-6 space-y-4 relative z-0">
                {/* Project Header */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-1 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.period && (
                        <div className="text-gray-400 text-xs font-medium">
                          {project.period}
                        </div>
                      )}
                      {project.category && (
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-700/50 text-gray-300">
                          {project.category === "client-work" ? "Client" : "Personal"}
                        </span>
                      )}
                    </div>
                  </div>
                  {project.type && (
                    <div className="flex-shrink-0">
                      {renderTypeIcon(project.type)}
                    </div>
                  )}
                </div>

                {/* Project Image / Carousel */}
                {getProjectImages(project).length > 0 ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer group/image">
                    <Image
                      src={(getCurrentImageForProject(project, index) as string) || ""}
                      alt={`${project.title} preview image`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover/image:scale-110 cursor-pointer"
                      onClick={() => openLightbox(index, imageIndexByProject[index] ?? 0)}
                      loading="lazy"
                      quality={85}
                    />
                    {getProjectImages(project).length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Previous image"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
                          onClick={(e) => { e.stopPropagation(); goToPrevImage(project, index); }}
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          aria-label="Next image"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
                          onClick={(e) => { e.stopPropagation(); goToNextImage(project, index); }}
                        >
                          ›
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                          {getProjectImages(project).map((_, i) => (
                            <span
                              key={i}
                              className={`h-1.5 w-1.5 rounded-full transition-all ${
                                (imageIndexByProject[index] ?? 0) === i
                                  ? 'bg-white w-4'
                                  : 'bg-white/40 hover:bg-white/60'
                              }`}
                            ></span>
                          ))}
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity"></div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-800/50 via-gray-700/30 to-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700/30">
                    <div className="text-center text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <p className="text-sm">No preview available</p>
                    </div>
                  </div>
                )}

                {/* Project Description */}
                {(project.description || project.des) && (
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {project.description || project.des}
                  </p>
                )}

                {/* Technology Stack */}
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 text-xs bg-gradient-to-r from-gray-700/60 to-gray-700/40 text-gray-200 rounded-md border border-gray-600/30 hover:border-blue-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="px-2.5 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-md border border-gray-600/30">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>
                )}

                {/* Project Links */}
                <div className="flex gap-3 pt-2 border-t border-gray-700/30">
                  {getProjectLink(project) && (
                    <a
                      href={getProjectLink(project)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-all duration-200 hover:gap-2"
                    >
                      <span>View Project</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {project.source && (
                    <a
                      href={typeof project.source === 'string' ? project.source : project.source[0]?.FE || project.source[0]?.BE}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-300 text-sm font-medium transition-all duration-200 hover:gap-2"
                    >
                      <span>Source</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm mt-2">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Enhanced Lightbox Modal */}
      {lightbox.open && lightbox.projectIndex !== null && (
        <div
          className="fixed inset-x-0 bottom-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
          style={{ top: STATUS_STRIP_HEIGHT_PX }}
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            onClick={closeLightbox}
          >
            ×
          </button>
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] px-4 md:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getProjectImages(filteredProjects[lightbox.projectIndex])[lightbox.imageIndex]}
              alt={`${filteredProjects[lightbox.projectIndex].title} - Image ${lightbox.imageIndex + 1}`}
              className="object-contain w-full h-full rounded-lg"
            />
            {getProjectImages(filteredProjects[lightbox.projectIndex]).length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl backdrop-blur-sm transition-all hover:scale-110"
                  onClick={lightboxPrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl backdrop-blur-sm transition-all hover:scale-110"
                  onClick={lightboxNext}
                >
                  ›
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
                  {getProjectImages(filteredProjects[lightbox.projectIndex]).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox({ ...lightbox, imageIndex: i })}
                      className={`h-2 rounded-full transition-all ${
                        lightbox.imageIndex === i
                          ? 'bg-white w-8'
                          : 'bg-white/40 w-2 hover:bg-white/60'
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
