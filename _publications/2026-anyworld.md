---
title: "AnyWorld: Factorized Egocentric World Models for Cross-Embodiment Generalization"
display_name: "AnyWorld"
display_summary: "Learning through world models"
collection: publications
permalink: /publication/2026-anyworld
date: 2026-08-29
venue: "arXiv (accepted at CoRL 2026)"
acceptance_banner: "CoRL 2026"
series_role: "world-model"
series_order: 3
series_label: "World-model direction"
series_positioning: "Generate robot-native experience for stronger UniT policies."
series_focus: "World-model-assisted policy learning"
series_summary: "Generate robot-native experience from human interaction to strengthen downstream policy learning."
keywords:
  - "World models"
  - "Policy adaptation"
authors: "Cheng Chen, Jerry Bai, Jiacheng Wei, <strong>Boyu Chen</strong>, Xiaoji Zheng, Fan Wu, Minghao Yang, Tianrun Chen, Ruibo Li, Xiaoyu Yue, Xiaoyang Guo, Yixiao Ge, Guosheng Lin, Fayao Liu"
citation_authors:
  - "Cheng Chen"
  - "Jerry Bai"
  - "Jiacheng Wei"
  - "Boyu Chen"
  - "Xiaoji Zheng"
  - "Fan Wu"
  - "Minghao Yang"
  - "Tianrun Chen"
  - "Ruibo Li"
  - "Xiaoyu Yue"
  - "Xiaoyang Guo"
  - "Yixiao Ge"
  - "Guosheng Lin"
  - "Fayao Liu"
citation_abstract: "Collecting contact-rich robot experiences at scale remains a major bottleneck for generalizable manipulation. Beyond data quantity, robot learning also requires diverse experiences across embodiments, viewpoints, and scenes. Human egocentric videos provide abundant physical interactions, but each video captures only a narrow slice of experience under a single body, camera trajectory, and environment. We propose AnyWorld, a cross-embodiment world modeling framework that expands a single human interaction into diverse robot-native rollouts without paired human-robot demonstrations. Our model factorizes an interaction into action, camera, and embodiment: action controls capture the motion structure, camera controls specify viewpoint evolution, and the target embodiment context defines the acting body and its interaction geometry. This formulation enables independent recomposition of embodiment, viewpoint, and scene factors, allowing a single model to generate many robot-domain experiences while preserving the underlying dynamics and object interactions. We train the model with large-scale human interaction pretraining followed by mixed-embodiment fine-tuning. Experiments show that our model supports controllable recomposition across embodiments, viewpoints, and scenes, and we further demonstrate that the generated data can improve manipulation performance on the RoboCasa GR1 tabletop benchmark and a real IRON humanoid robot. Beyond aggregate gains, we test whether unpaired human experience can be recomposed into robot-native video-action pairs that target a policy gap. Controlled IRON interventions correct a spurious completion prior and establish language-grounded spatial target selection; an action-only counterfactual intervention fails to learn the latter reliably, showing that both action calibration and visual recomposition are necessary."
arxiv_id: "2608.29242"
teaser: "/images/anyworld_teaser.png"
projecturl: "https://xpeng-robotics.github.io/anyworld/"
paperurl: "https://arxiv.org/pdf/2608.29242"
bibtexurl: "/files/AnyWorld.bib"
codeurl: "https://github.com/xpeng-robotics/AnyWorld"
citation: "Cheng Chen, Jerry Bai, Jiacheng Wei, Boyu Chen, Xiaoji Zheng, Fan Wu, Minghao Yang, Tianrun Chen, Ruibo Li, Xiaoyu Yue, Xiaoyang Guo, Yixiao Ge, Guosheng Lin, and Fayao Liu. &quot;AnyWorld: Factorized Egocentric World Models for Cross-Embodiment Generalization.&quot; arXiv preprint arXiv:2608.29242, 2026."
excerpt: "AnyWorld extends **UniT through world modeling**, turning human interactions into controllable robot-native experience for downstream UniT policy adaptation."
citation_doi: "10.48550/arXiv.2608.29242"
community_metrics:
  checked: "2026-10-12"
  scholar_url: "https://www.semanticscholar.org/paper/d29282bee802ec6211b801acc66f4023405038ae"
  scholar_citations: 3
authors_short: "Cheng Chen, Jerry Bai, Jiacheng Wei, <strong>Boyu Chen</strong>, Xiaoji Zheng, et al."
---
Cheng Chen, Jerry Bai, Jiacheng Wei, Boyu Chen, Xiaoji Zheng, Fan Wu, Minghao Yang, Tianrun Chen, Ruibo Li, Xiaoyu Yue, Xiaoyang Guo, Yixiao Ge, Guosheng Lin, Fayao Liu.

[Paper](https://arxiv.org/abs/2608.29242) · [Recommended BibTeX](/files/AnyWorld.bib) · [DOI](https://doi.org/10.48550/arXiv.2608.29242) · [Project](https://xpeng-robotics.github.io/anyworld/)

## Abstract

Collecting contact-rich robot experiences at scale remains a major bottleneck for generalizable manipulation. Beyond data quantity, robot learning also requires diverse experiences across embodiments, viewpoints, and scenes. Human egocentric videos provide abundant physical interactions, but each video captures only a narrow slice of experience under a single body, camera trajectory, and environment. We propose AnyWorld, a cross-embodiment world modeling framework that expands a single human interaction into diverse robot-native rollouts without paired human-robot demonstrations. Our model factorizes an interaction into action, camera, and embodiment: action controls capture the motion structure, camera controls specify viewpoint evolution, and the target embodiment context defines the acting body and its interaction geometry. This formulation enables independent recomposition of embodiment, viewpoint, and scene factors, allowing a single model to generate many robot-domain experiences while preserving the underlying dynamics and object interactions. We train the model with large-scale human interaction pretraining followed by mixed-embodiment fine-tuning. Experiments show that our model supports controllable recomposition across embodiments, viewpoints, and scenes, and we further demonstrate that the generated data can improve manipulation performance on the RoboCasa GR1 tabletop benchmark and a real IRON humanoid robot. Beyond aggregate gains, we test whether unpaired human experience can be recomposed into robot-native video-action pairs that target a policy gap. Controlled IRON interventions correct a spurious completion prior and establish language-grounded spatial target selection; an action-only counterfactual intervention fails to learn the latter reliably, showing that both action calibration and visual recomposition are necessary.

## Citation

Use this complete entry or download the BibTeX linked above.

{% raw %}
```bibtex
@article{chen2026anyworld,
  title = {{AnyWorld}: Factorized Egocentric World Models for Cross-Embodiment Generalization},
  author = {Chen, Cheng and Bai, Jerry and Wei, Jiacheng and Chen, Boyu and Zheng, Xiaoji and Wu, Fan and Yang, Minghao and Chen, Tianrun and Li, Ruibo and Yue, Xiaoyu and Guo, Xiaoyang and Ge, Yixiao and Lin, Guosheng and Liu, Fayao},
  journal = {arXiv preprint arXiv:2608.29242},
  year = {2026},
  eprint = {2608.29242},
  archivePrefix = {arXiv},
  primaryClass = {cs.RO},
  doi = {10.48550/arXiv.2608.29242},
  url = {https://arxiv.org/abs/2608.29242}
}
```
{% endraw %}
