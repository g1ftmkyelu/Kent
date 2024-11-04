import { Resources } from "../resources";
const projectResource = Resources.find(resource => resource.path === "projects");

export const blockConfigs = [
  {
    id: 'project-pie-chart',
    name: 'Project Distribution',
    title: 'Project Distribution',
    config: {
      type: 'distribution-chart',
      props: {
        resource: projectResource,
        fieldName: "milestones",
        chartType: "pie",
        showHeader: false,
      }
    }
  },
  {
    id: 'my-projects-block',
    name: 'My Projects',
    title: 'Project Milestones',
    config: {
      type: 'block-accordion',
      props: {
        sections: [
            {
              key: "all-projects",
              title: "All Projects",
              blockConfigs: [
                {
                  id: 'all-projects-list',
                  name: 'All Projects List',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      defaultPageSize: 10
                    }
                  }
                }
              ],
              layout: [
                {name: "All Projects List", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "planning-permits",
              title: "Planning & Permits",
              blockConfigs: [
                {
                  id: 'planning-permits-projects',
                  name: 'Planning & Permits Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'planning'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Planning & Permits Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "site-preparation",
              title: "Site Preparation",
              blockConfigs: [
                {
                  id: 'site-preparation-projects',
                  name: 'Site Preparation Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'site_preparation'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Site Preparation Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "foundation",
              title: "Foundation",
              blockConfigs: [
                {
                  id: 'foundation-projects',
                  name: 'Foundation Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'foundation'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Foundation Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "framing",
              title: "Framing",
              blockConfigs: [
                {
                  id: 'framing-projects',
                  name: 'Framing Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'framing'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Framing Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "roofing",
              title: "Roofing",
              blockConfigs: [
                {
                  id: 'roofing-projects',
                  name: 'Roofing Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'roofing'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Roofing Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "windows-doors",
              title: "Windows & Doors",
              blockConfigs: [
                {
                  id: 'windows-doors-projects',
                  name: 'Windows & Doors Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'windows_doors'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Windows & Doors Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "rough-in",
              title: "Rough-In",
              blockConfigs: [
                {
                  id: 'rough-in-projects',
                  name: 'Rough-In Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'rough_in'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Rough-In Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "insulation",
              title: "Insulation",
              blockConfigs: [
                {
                  id: 'insulation-projects',
                  name: 'Insulation Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'insulation'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Insulation Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "drywall",
              title: "Drywall",
              blockConfigs: [
                {
                  id: 'drywall-projects',
                  name: 'Drywall Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'drywall'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Drywall Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "interior-finishes",
              title: "Interior Finishes",
              blockConfigs: [
                {
                  id: 'interior-finishes-projects',
                  name: 'Interior Finishes Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'interior_finishes'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Interior Finishes Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "exterior-finishes",
              title: "Exterior Finishes",
              blockConfigs: [
                {
                  id: 'exterior-finishes-projects',
                  name: 'Exterior Finishes Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'exterior_finishes'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Exterior Finishes Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "final-inspection",
              title: "Final Inspection",
              blockConfigs: [
                {
                  id: 'final-inspection-projects',
                  name: 'Final Inspection Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'final_inspection'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Final Inspection Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            },
            {
              key: "handover",
              title: "Handover",
              blockConfigs: [
                {
                  id: 'handover-projects',
                  name: 'Handover Projects',
                  config: {
                    type: 'data-group',
                    props: {
                      resource: projectResource,
                      layout: projectResource.layout,
                      useApi: true,
                      showMoreLink: false,
                      showHeader: false,
                      maxDisplayItems: 10,
                      presetFilters: {
                        milestone: 'handover'
                      }
                    }
                  }
                }
              ],
              layout: [
                {name: "Handover Projects", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
              ]
            }
          ]
      }
    }
  },
  {
    id: 'project-timeline-block',
    name: 'Project Timeline',
    title: 'Project Activity Timeline',
    config: {
      type: 'timeline',
      props: {
        resource: projectResource,
        showHeader: false,
        layout: projectResource.layout,
        maxDisplayItems: 10,
        useApi: true,
        showMoreLink: true,
      },
    },
  }
];

export const layout = [
  { name: 'My Projects', rowStart: 2, colStart: 1, rowSpan: 2, colSpan: 8 },
  { name: 'Project Distribution', rowStart: 2, colStart: 9, rowSpan: 1, colSpan: 4 },
  { name: 'Project Timeline', rowStart: 7, colStart: 1, rowSpan: 1, colSpan: 8 },
];

export default {
  blockConfigs,
  layout,
};