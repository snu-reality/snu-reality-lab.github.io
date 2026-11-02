/* =====================================================================
   SNU Reality Lab — publication list (single source of truth)
   ---------------------------------------------------------------------
   Read by: index.html (home cards), publications/index.html (full list),
            assets/js/project-page.js (per-paper project pages).

   Fields
     id            unique id (also used for FLIP animation)
     slug          (optional) internal project page at /publications/<slug>/
     year, venue   venue is the short label shown on cards
     homeVisible   show on the landing page
     selected      show under "Selected" filter on /publications/
     shortTitle / longTitle / shortAuthors / authors   (* = equal contrib.)
     teaserImage   card visual (.mp4 autoplays). Path is site-root relative
     teaserFit     "cover" (default) | "contain" (figures with white bg)
     projectLink   external project page / article (card click fallback)
     links         [{label, url}] in order: Paper (Arxiv only if no Paper), Supp, Code, Video
     bibtex
   ===================================================================== */
(function () {
  // Resolve the site root from this script's own URL so the same data works
  // from /, /publications/, /publications/<slug>/ and from file:// previews.
  var src = (document.currentScript && document.currentScript.src) || '';
  var ROOT = src ? src.replace(/data\/publications\.js(\?.*)?$/, '') : '/';
  function A(p) { return ROOT + 'assets/pubs/' + p; }
  window.SITE_ROOT = window.SITE_ROOT || ROOT;

  window.HOME_PUBLICATIONS = [
  /* ------------------------------ 2026 ------------------------------ */
  {
    id: "pub-sig2026-holopathtracer",
    year: 2026,
    venue: "SIGGRAPH 2026",
    homeVisible: false,
    selected: true,
    shortTitle: "Fast and Accurate Wave Path Tracing",
    longTitle: "HoloPathTracer: Fast and Accurate Wave Path Tracing for Holography",
    shortAuthors: "W. Zhou, X. Meng et al.",
    authors: "Wenbin Zhou*, Xiangyu Meng*, Jiankai Xing, Xin Liu, Suyeon Choi, Yifan Peng",
    teaserImage: A("sig2026-holopathtracer.jpg"),
    teaserFit: "contain",
    projectLink: "https://zhou-wb.github.io/holopathtracer/",
    links: [
      { label: "Project Page", url: "https://zhou-wb.github.io/holopathtracer/" },
      { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3811351" },
      { label: "Supp", url: "https://zhou-wb-assets-1312117421.cos.accelerate.myqcloud.com/zhou-wb.github.io/assets/pdf/zhou2026holopathtracer_supplement.pdf" }
    ],
    bibtex: `@article{zhou2026holopathtracer,
  title={HoloPathTracer: Fast and Accurate Wave Path Tracing for Holography},
  author={Zhou, Wenbin and Meng, Xiangyu and Xing, Jiankai and Liu, Xin and Choi, Suyeon and Peng, Yifan},
  journal={ACM Transactions on Graphics (TOG)},
  volume={45},
  number={4},
  pages={1--12},
  year={2026}
}`
  },
  {
    id: "pub-iccp2026-mif",
    slug: "mutual-intensity-factorization",
    year: 2026,
    venue: "ICCP 2026",
    homeVisible: false,
    selected: false,
    shortTitle: "Mutual Intensity Factorization",
    longTitle: "Mutual Intensity Factorization for Computer-Generated Holography",
    shortAuthors: "J. Yang, B. Chao et al.",
    authors: "Jacqueline Yang, Brian Chao, Seung-Woo Nam, Suyeon Choi, Gordon Wetzstein",
    teaserImage: A("iccp2026-mif.jpg"),
    teaserFit: "contain",
    projectLink: "https://ieeexplore.ieee.org/document/11668880",
    links: [
      { label: "Paper", url: "https://ieeexplore.ieee.org/document/11668880" }
    ],
    bibtex: `@inproceedings{yang2026mutual,
  title={Mutual Intensity Factorization for Computer-Generated Holography},
  author={Yang, Jacqueline and Chao, Brian and Nam, Seung-Woo and Choi, Suyeon and Wetzstein, Gordon},
  booktitle={IEEE International Conference on Computational Photography (ICCP)},
  pages={1--11},
  year={2026}
}`
  },
  {
    id: "pub-tsm2026-etch",
    slug: "differentiable-etch-proximity-correction",
    year: 2026,
    venue: "IEEE Transactions on Semiconductor Manufacturing",
    homeVisible: false,
    selected: false,
    shortTitle: "Differentiable Etch Proximity Correction",
    longTitle: "Differentiable Etch Proximity Correction with Transformer-Based Optimization",
    shortAuthors: "S. Lee, G. Yang et al.",
    authors: "Sooyong Lee, Guandao Yang, Suyeon Choi, Seongtae Jeong, Gordon Wetzstein",
    teaserImage: A("tsm2026-etch.jpg"),
    teaserFit: "contain",
    projectLink: "https://ieeexplore.ieee.org/document/11657445",
    links: [
      { label: "Paper", url: "https://ieeexplore.ieee.org/document/11657445" }
    ],
    bibtex: `@article{lee2026differentiable,
  title={Differentiable Etch Proximity Correction with Transformer-Based Optimization},
  author={Lee, Sooyong and Yang, Guandao and Choi, Suyeon and Jeong, Seongtae and Wetzstein, Gordon},
  journal={IEEE Transactions on Semiconductor Manufacturing},
  year={2026}
}`
  },

  /* ------------------------------ 2025 ------------------------------ */
  {
    id: "pub-natphoton-2025-mr",
    slug: "synthetic-aperture-waveguide-holography",
    year: 2025,
    venue: "Nature Photonics",
    homeVisible: true,
    selected: true,
    shortTitle: "Synthetic Aperture Waveguide Holography",
    longTitle: "Synthetic Aperture Waveguide Holography for Compact Mixed-Reality Displays with Large Étendue",
    shortAuthors: "S. Choi, C. Jang et al.",
    authors: "Suyeon Choi*, Changwon Jang*, Douglas Lanman, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/np2025/teaser.mp4",
    teaserLink: "https://www.nature.com/articles/s41566-025-01718-w",
    projectLink: "https://www.computationalimaging.org/publications/synthetic-aperture-waveguide-holography/",
    links: [
      { label: "Paper", url: "https://www.nature.com/articles/s41566-025-01718-w" },
      { label: "Code", url: "https://github.com/choisuyeon/sawh" }
    ],
    bibtex: `@article{choi2025synthetic,
  title={Synthetic aperture waveguide holography for compact mixed-reality displays with large {\\'e}tendue},
  author={Choi, Suyeon and Jang, Changwon and Lanman, Douglas and Wetzstein, Gordon},
  journal={Nature Photonics},
  volume={19},
  number={8},
  pages={854--863},
  year={2025}
}`
  },
  {
    id: "pub-siggraph-2025-gws",
    slug: "gaussian-wave-splatting",
    year: 2025,
    venue: "SIGGRAPH 2025",
    homeVisible: true,
    selected: true,
    shortTitle: "Gaussian Wave Splatting",
    longTitle: "Gaussian Wave Splatting for Computer-Generated Holography",
    shortAuthors: "S. Choi, B. Chao et al.",
    authors: "Suyeon Choi*, Brian Chao*, Jacqueline Yang, Manu Gopakumar, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/SIG2025/garden_nvs_focal_stack.mp4",
    projectLink: "https://bchao1.github.io/gaussian-wave-splatting/",
    links: [
      { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3731163" },
      { label: "Supp", url: "https://drive.google.com/file/d/15Icq4NgdBqc56LZ_qsRCJ_eiwAqJQ49Y/view?usp=sharing" },
      { label: "Code", url: "https://github.com/computational-imaging/hsplat" },
      { label: "Video", url: "https://www.youtube.com/watch?v=ttDCDbhEf7Q" }
    ],
    bibtex: `@article{choi2025gaussian,
  title={Gaussian Wave Splatting for Computer-Generated Holography},
  author={Choi, Suyeon and Chao, Brian and Yang, Jacqueline and Gopakumar, Manu and Wetzstein, Gordon},
  journal={ACM Transactions on Graphics (TOG)},
  volume={44},
  number={4},
  pages={1--13},
  year={2025}
}`
  },

  /* ------------------------------ 2024 ------------------------------ */
  {
    id: "pub-sigasia2024",
    slug: "large-etendue-dynamic-fourier-modulation",
    year: 2024,
    venue: "SIGGRAPH Asia 2024",
    homeVisible: false,
    selected: false,
    shortTitle: "Large Étendue 3D Holographic Display",
    longTitle: "Large Étendue 3D Holographic Display with Content-adaptive Dynamic Fourier Modulation",
    shortAuthors: "B. Chao, M. Gopakumar et al.",
    authors: "Brian Chao, Manu Gopakumar, Suyeon Choi, Jonghyun Kim, Liang Shi, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/SIGAsia2024/teaser.gif",
    projectLink: "https://bchao1.github.io/holo_dfm/",
    links: [
      { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3680528.3687600" },
      { label: "Video", url: "https://www.youtube.com/watch?v=Rt1f18nBkAc" }
    ],
    bibtex: `@inproceedings{chao2024large,
  title={Large {\\'e}tendue 3D holographic display with content-adaptive dynamic Fourier modulation},
  author={Chao, Brian and Gopakumar, Manu and Choi, Suyeon and Kim, Jonghyun and Shi, Liang and Wetzstein, Gordon},
  booktitle={SIGGRAPH Asia 2024 Conference Papers},
  pages={1--12},
  year={2024}
}`
  },
  {
    id: "pub-nature-2024-holographic",
    slug: "holographic-ar-glasses",
    year: 2024,
    venue: "Nature",
    homeVisible: true,
    selected: true,
    shortTitle: "Full-Color 3D Holographic AR Glasses",
    longTitle: "Full-Colour 3D Holographic Augmented-Reality Displays with Metasurface Waveguides",
    shortAuthors: "M. Gopakumar, G.-Y. Lee et al.",
    authors: "Manu Gopakumar*, Gun-Yeal Lee*, Suyeon Choi, Brian Chao, Yifan Peng, Jonghyun Kim, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/nature2024/teaser.jpeg",
    teaserLink: "https://www.nature.com/articles/s41586-024-07386-0",
    projectLink: "https://www.computationalimaging.org/publications/holographicar/",
    links: [
      { label: "Paper", url: "https://www.nature.com/articles/s41586-024-07386-0" },
      { label: "Code", url: "https://github.com/computational-imaging/holographic-AR-glasses" }
    ],
    bibtex: `@article{gopakumar2024full,
  title={Full-colour 3D holographic augmented-reality displays with metasurface waveguides},
  author={Gopakumar, Manu and Lee, Gun-Yeal and Choi, Suyeon and Chao, Brian and Peng, Yifan and Kim, Jonghyun and Wetzstein, Gordon},
  journal={Nature},
  volume={629},
  number={8013},
  pages={791--797},
  year={2024}
}`
  },
  {
    id: "pub-siggraph-2024-parallax",
    slug: "holographic-parallax",
    year: 2024,
    venue: "SIGGRAPH 2024",
    homeVisible: false,
    selected: true,
    shortTitle: "Holographic Parallax",
    longTitle: "Holographic Parallax Improves 3D Perceptual Realism",
    shortAuthors: "D. Kim, S.-W. Nam, S. Choi et al.",
    authors: "Dongyeon Kim*, Seung-Woo Nam*, Suyeon Choi*, Jong-Mo Seo, Gordon Wetzstein, Yoonchan Jeong",
    teaserImage: "https://choisuyeon.github.io/assets/images/SIG2024/hp_teaser.gif",
    projectLink: "https://www.computationalimaging.org/publications/holographic-parallax/",
    links: [
      { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3658168" }
    ],
    bibtex: `@article{kim2024holographic,
  title={Holographic parallax improves 3D perceptual realism},
  author={Kim, Dongyeon and Nam, Seung-Woo and Choi, Suyeon and Seo, Jong-Mo and Wetzstein, Gordon and Jeong, Yoonchan},
  journal={ACM Transactions on Graphics (TOG)},
  volume={43},
  number={4},
  pages={1--13},
  year={2024}
}`
  },

  /* ------------------------------ 2023 ------------------------------ */
  {
    id: "pub-ol2023-brightness",
    slug: "high-brightness-holographic-projection",
    year: 2023,
    venue: "Optics Letters",
    homeVisible: false,
    selected: false,
    shortTitle: "High-Brightness Holographic Projection",
    longTitle: "High-Brightness Holographic Projection",
    shortAuthors: "B. Chao, M. Gopakumar et al.",
    authors: "Brian Chao, Manu Gopakumar, Suyeon Choi, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/OL2023/teaser.mp4",
    projectLink: "https://opg.optica.org/ol/fulltext.cfm?uri=ol-48-15-4041&id=535470",
    links: [
      { label: "Paper", url: "https://opg.optica.org/ol/fulltext.cfm?uri=ol-48-15-4041&id=535470" }
    ],
    bibtex: `@article{chao2023high,
  title={High-brightness holographic projection},
  author={Chao, Brian and Gopakumar, Manu and Choi, Suyeon and Wetzstein, Gordon},
  journal={Optics Letters},
  volume={48},
  number={15},
  pages={4041--4044},
  year={2023}
}`
  },

  /* ------------------------------ 2022 ------------------------------ */
  {
    id: "pub-sig2022-time",
    slug: "time-multiplexed-neural-holography",
    year: 2022,
    venue: "SIGGRAPH 2022",
    homeVisible: false,
    selected: true,
    shortTitle: "Time-multiplexed Neural Holography",
    longTitle: "Time-multiplexed Neural Holography: A Flexible Framework for Holographic Near-eye Displays with Fast Heavily-quantized Spatial Light Modulators",
    shortAuthors: "S. Choi, M. Gopakumar et al.",
    authors: "Suyeon Choi*, Manu Gopakumar*, Yifan Peng, Jonghyun Kim, Matthew O'Toole, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/SIG2022/tmnh_teaser.gif",
    projectLink: "https://www.computationalimaging.org/publications/time-multiplexed-neural-holography/",
    links: [
      { label: "Paper", url: "https://drive.google.com/file/d/1n8xSdHgW0D5G5HhwSKrqCy1iztAcDHgX/view?usp=sharing" },
      { label: "Supp", url: "https://drive.google.com/file/d/1n9hdLq1xvur4I_OkGNyFgoKHGDZcMxcE/view" },
      { label: "Code", url: "https://github.com/computational-imaging/time-multiplexed-neural-holography" },
      { label: "Video", url: "https://www.youtube.com/watch?v=k2dg-Ckhk5Q" }
    ],
    bibtex: `@inproceedings{choi2022time,
  title={Time-multiplexed neural holography: a flexible framework for holographic near-eye displays with fast heavily-quantized spatial light modulators},
  author={Choi, Suyeon and Gopakumar, Manu and Peng, Yifan and Kim, Jonghyun and O'Toole, Matthew and Wetzstein, Gordon},
  booktitle={ACM SIGGRAPH 2022 Conference Proceedings},
  pages={1--9},
  year={2022}
}`
  },
  {
    id: "pub-sig2022-thinvr",
    slug: "holographic-glasses",
    year: 2022,
    venue: "SIGGRAPH 2022",
    homeVisible: false,
    selected: false,
    shortTitle: "Holographic Glasses for Virtual Reality",
    longTitle: "Holographic Glasses for Virtual Reality",
    shortAuthors: "J. Kim, M. Gopakumar et al.",
    authors: "Jonghyun Kim, Manu Gopakumar, Suyeon Choi, Yifan Peng, Ward Lopes, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/SIG2022/thinvr_teaser.png",
    projectLink: "https://research.nvidia.com/publication/2022-08_holographic-glasses-virtual-reality",
    links: [
      { label: "Paper", url: "https://choisuyeon.github.io/assets/files/siggraph2022_thinvr_main.pdf" },
      { label: "Supp", url: "https://choisuyeon.github.io/assets/files/siggraph2022_thinvr_supp.pdf" },
      { label: "Video", url: "https://www.youtube.com/watch?v=dGzj-AgI6RI" }
    ],
    bibtex: `@inproceedings{kim2022holographic,
  title={Holographic glasses for virtual reality},
  author={Kim, Jonghyun and Gopakumar, Manu and Choi, Suyeon and Peng, Yifan and Lopes, Ward and Wetzstein, Gordon},
  booktitle={ACM SIGGRAPH 2022 Conference Proceedings},
  pages={1--9},
  year={2022}
}`
  },

  /* ------------------------------ 2021 ------------------------------ */
  {
    id: "pub-sigasia2021-nh3d",
    slug: "neural-3d-holography",
    year: 2021,
    venue: "SIGGRAPH Asia 2021",
    homeVisible: false,
    selected: true,
    shortTitle: "Neural 3D Holography",
    longTitle: "Neural 3D Holography: Learning Accurate Wave Propagation Models for 3D Holographic Virtual and Augmented Reality Displays",
    shortAuthors: "S. Choi, M. Gopakumar et al.",
    authors: "Suyeon Choi*, Manu Gopakumar*, Yifan Peng, Jonghyun Kim, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/SIGAsia2021/ar.mp4",
    projectLink: "https://www.computationalimaging.org/publications/neuralholography3d/",
    links: [
      { label: "Paper", url: "https://choisuyeon.github.io/assets/files/ToG21.pdf" },
      { label: "Supp", url: "https://drive.google.com/file/d/1FNSXBYivIN9hqDUxzUIMgSFVKJKtFEOr/view?usp=sharing" },
      { label: "Code", url: "https://github.com/computational-imaging/neural-3d-holography" },
      { label: "Video", url: "https://www.youtube.com/watch?v=EsxGnUd8Efs" }
    ],
    bibtex: `@article{choi2021neural,
  title={Neural 3D holography: Learning accurate wave propagation models for 3D holographic virtual and augmented reality displays},
  author={Choi, Suyeon and Gopakumar, Manu and Peng, Yifan and Kim, Jonghyun and Wetzstein, Gordon},
  journal={ACM Transactions on Graphics (TOG)},
  volume={40},
  number={6},
  pages={1--12},
  year={2021}
}`
  },
  {
    id: "pub-ol2021-unfiltered",
    slug: "unfiltered-holography",
    year: 2021,
    venue: "Optics Letters",
    homeVisible: false,
    selected: false,
    shortTitle: "Unfiltered Holography",
    longTitle: "Unfiltered Holography: Optimizing High Diffraction Orders without Optical Filtering for Compact Holographic Displays",
    shortAuthors: "M. Gopakumar, J. Kim et al.",
    authors: "Manu Gopakumar, Jonghyun Kim, Suyeon Choi, Yifan Peng, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/OL2021/HOGD8.png",
    projectLink: "https://www.computationalimaging.org/publications/unfilteredholography/",
    links: [
      { label: "Paper", url: "https://opg.optica.org/ol/fulltext.cfm?uri=ol-46-23-5822&id=464968" },
      { label: "Supp", url: "https://opticapublishing.figshare.com/articles/journal_contribution/Supplementary_document_for_Unfiltered_Holography_Optimizing_High_Diffraction_Orders_without_Optical_Filtering_for_Compact_Holographic_Displays_-_5523480_pdf/16913164" }
    ],
    bibtex: `@article{gopakumar2021unfiltered,
  title={Unfiltered holography: optimizing high diffraction orders without optical filtering for compact holographic displays},
  author={Gopakumar, Manu and Kim, Jonghyun and Choi, Suyeon and Peng, Yifan and Wetzstein, Gordon},
  journal={Optics Letters},
  volume={46},
  number={23},
  pages={5822--5825},
  year={2021}
}`
  },
  {
    id: "pub-sciadv2021-speckle",
    slug: "speckle-free-holography",
    year: 2021,
    venue: "Science Advances",
    homeVisible: false,
    selected: true,
    shortTitle: "Speckle-free Holography",
    longTitle: "Speckle-free Holography with Partially Coherent Light Sources and Camera-in-the-loop Calibration",
    shortAuthors: "Y. Peng, S. Choi et al.",
    authors: "Yifan Peng, Suyeon Choi, Jonghyun Kim, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/Sciadv/lion.png",
    projectLink: "http://www.computationalimaging.org/publications/partiallycoherentholography/",
    links: [
      { label: "Paper", url: "https://www.science.org/doi/10.1126/sciadv.abg5040" },
      { label: "Code", url: "https://github.com/computational-imaging/partially_coherent_neural_holography" },
      { label: "Video", url: "https://www.youtube.com/watch?v=Heegf1NvTdI" }
    ],
    bibtex: `@article{peng2021speckle,
  title={Speckle-free holography with partially coherent light sources and camera-in-the-loop calibration},
  author={Peng, Yifan and Choi, Suyeon and Kim, Jonghyun and Wetzstein, Gordon},
  journal={Science Advances},
  volume={7},
  number={46},
  pages={eabg5040},
  year={2021}
}`
  },
  {
    id: "pub-optica2021-michelson",
    slug: "michelson-holography",
    year: 2021,
    venue: "Optica",
    homeVisible: false,
    selected: true,
    shortTitle: "Michelson Holography",
    longTitle: "Optimizing Image Quality for Holographic Near-eye Displays with Michelson Holography",
    shortAuthors: "S. Choi, J. Kim et al.",
    authors: "Suyeon Choi, Jonghyun Kim, Yifan Peng, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/MH/teaser_double.png",
    projectLink: "http://www.computationalimaging.org/publications/michelsonholography/",
    links: [
      { label: "Paper", url: "https://opg.optica.org/optica/fulltext.cfm?uri=optica-8-2-143&id=446984" },
      { label: "Supp", url: "https://osapublishing.figshare.com/articles/journal_contribution/Supplementary_document_for_Michelson_Holography_Dual-SLM_Holography_with_Camera-in-the-loop_Optimization_-_4929111_pdf/13360166" }
    ],
    bibtex: `@article{choi2021optimizing,
  title={Optimizing image quality for holographic near-eye displays with Michelson holography},
  author={Choi, Suyeon and Kim, Jonghyun and Peng, Yifan and Wetzstein, Gordon},
  journal={Optica},
  volume={8},
  number={2},
  pages={143--146},
  year={2021}
}`
  },

  /* ------------------------------ 2020 ------------------------------ */
  {
    id: "pub-sigasia2020",
    slug: "neural-holography",
    year: 2020,
    venue: "SIGGRAPH Asia 2020",
    homeVisible: false,
    selected: true,
    shortTitle: "Neural Holography",
    longTitle: "Neural Holography with Camera-in-the-loop Training",
    shortAuthors: "Y. Peng, S. Choi et al.",
    authors: "Yifan Peng, Suyeon Choi, Nitish Padmanaban, Gordon Wetzstein",
    teaserImage: "https://choisuyeon.github.io/assets/images/SIGAsia2020/thumbnail.gif",
    projectLink: "http://www.computationalimaging.org/publications/neuralholography/",
    links: [
      { label: "Paper", url: "https://choisuyeon.github.io/assets/files/neural_holography_SIGAsia20.pdf" },
      { label: "Supp", url: "https://drive.google.com/file/d/1vay4xeg5iC7y8CLWR6nQEWe3mjBuqCWB/view" },
      { label: "Code", url: "https://github.com/computational-imaging/neural-holography" },
      { label: "Video", url: "https://www.youtube.com/watch?v=Az4FDIVY7-w" }
    ],
    bibtex: `@article{peng2020neural,
  title={Neural holography with camera-in-the-loop training},
  author={Peng, Yifan and Choi, Suyeon and Padmanaban, Nitish and Wetzstein, Gordon},
  journal={ACM Transactions on Graphics (TOG)},
  volume={39},
  number={6},
  pages={1--14},
  year={2020}
}`
  },
  {
    id: "pub-tvcg2020-focalblocks",
    slug: "focal-blocks-hmd",
    year: 2020,
    venue: "IEEE Transactions on Visualization and Computer Graphics",
    homeVisible: false,
    selected: false,
    shortTitle: "Volumetric HMD with Locally Adaptive Focal Blocks",
    longTitle: "Volumetric Head-Mounted Display with Locally Adaptive Focal Blocks",
    shortAuthors: "D. Yoo, S. Lee et al.",
    authors: "Dongheon Yoo, Seungjae Lee, Youngjin Jo, Jaebum Cho, Suyeon Choi, Byoungho Lee",
    teaserImage: "https://choisuyeon.github.io/assets/images/tvcg2020/thumbnail.png",
    teaserFit: "contain",
    projectLink: "https://choisuyeon.github.io/assets/files/tvcg2020.pdf",
    links: [
      { label: "Paper", url: "https://choisuyeon.github.io/assets/files/tvcg2020.pdf" }
    ],
    bibtex: `@article{yoo2020volumetric,
  title={Volumetric head-mounted display with locally adaptive focal blocks},
  author={Yoo, Dongheon and Lee, Seungjae and Jo, Youngjin and Cho, Jaebum and Choi, Suyeon and Lee, Byoungho},
  journal={IEEE Transactions on Visualization and Computer Graphics},
  volume={28},
  number={2},
  pages={1415--1427},
  year={2020}
}`
  },

  /* ------------------------------ 2019 ------------------------------ */
  {
    id: "pub-sigasia2019-tomo",
    slug: "tomographic-projector",
    year: 2019,
    venue: "SIGGRAPH Asia 2019",
    homeVisible: false,
    selected: false,
    shortTitle: "Tomographic Projector",
    longTitle: "Tomographic Projector: Large Scale Volumetric Display with Uniform Viewing Experiences",
    shortAuthors: "Y. Jo, S. Lee et al.",
    authors: "Youngjin Jo*, Seungjae Lee*, Dongheon Yoo, Suyeon Choi, Dongyeon Kim, Byoungho Lee",
    teaserImage: "https://choisuyeon.github.io/assets/images/tomographic-projector/thumbnail.png",
    projectLink: "https://choisuyeon.github.io/assets/files/ToG19.pdf",
    links: [
      { label: "Paper", url: "https://choisuyeon.github.io/assets/files/ToG19.pdf" },
      { label: "Supp", url: "https://dl.acm.org/action/downloadSupplement?doi=10.1145%2F3355089.3356577&file=a215-jo.zip" }
    ],
    bibtex: `@article{jo2019tomographic,
  title={Tomographic projector: large scale volumetric display with uniform viewing experiences},
  author={Jo, Youngjin and Lee, Seungjae and Yoo, Dongheon and Choi, Suyeon and Kim, Dongyeon and Lee, Byoungho},
  journal={ACM Transactions on Graphics (TOG)},
  volume={38},
  number={6},
  pages={1--13},
  year={2019}
}`
  },
  {
    id: "pub-oe2019-binary",
    slug: "optimal-binary-tomographic-display",
    year: 2019,
    venue: "Optics Express",
    homeVisible: false,
    selected: false,
    shortTitle: "Optimal Binary Representation on Tomographic Displays",
    longTitle: "Optimal Binary Representation via Non-convex Optimization on Tomographic Displays",
    shortAuthors: "S. Choi, S. Lee et al.",
    authors: "Suyeon Choi, Seungjae Lee, Youngjin Jo, Dongheon Yoo, Dongyeon Kim, Byoungho Lee",
    teaserImage: "https://choisuyeon.github.io/assets/images/Non-convex/proposed_ani.gif",
    teaserFit: "contain",
    projectLink: "https://doi.org/10.1364/OE.27.024362",
    links: [
      { label: "Paper", url: "https://doi.org/10.1364/OE.27.024362" },
      { label: "Code", url: "https://github.com/choisuyeon/optimal-binary-representation-via-non-convex-optimization-on-tomographic-displays" }
    ],
    bibtex: `@article{choi2019optimal,
  title={Optimal binary representation via non-convex optimization on tomographic displays},
  author={Choi, Suyeon and Lee, Seungjae and Jo, Youngjin and Yoo, Dongheon and Kim, Dongyeon and Lee, Byoungho},
  journal={Optics Express},
  volume={27},
  number={17},
  pages={24362--24381},
  year={2019}
}`
  }
  ];
})();
