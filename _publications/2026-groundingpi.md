---
title: "GroundingPI: A Grounding Foundation Model towards Physical Intelligence with Visual Primitives"
collection: "publications"
permalink: "/publication/2026-groundingpi"
date: "2026-09-30"
venue: "arXiv preprint"
story_title: "Grounding for physical intelligence"
story_summary: "GroundingPI studies a complementary question: how can precise perception become a reusable foundation for robotic manipulation and autonomous driving?"
excerpt: "GroundingPI learns points and boxes as shared visual primitives, then transfers its perceptual representations to robotic manipulation and autonomous driving."
authors: "Qize Yu*&Dagger;, Lianrui Fan*, <strong>Boyu Chen</strong>*, Jiaqi Liang*, Xini Ding*, Yue Chen, Zetian Song, Yuran Wang, Yi Zou, Kaixuan Wang, Tianxing Chen, Wenxuan Song, Bohan Zhou, Mingleyang Li, Siqiao Huang, Yuqi Ye, Caigao Jiang, Wei Wei, Ruihai Wu, Hang Zhang, Yixiao Ge, Shuchang Zhou, Shilong Liu, Xianming Liu, Ping Luo&Dagger;, Shiyu Huang&Dagger;"
notes: "*Equal contribution &nbsp; &Dagger;Corresponding authors"
citation_abstract: "Precise grounding matters. It specifies which object is the target and where that object is, even in clutter and for tiny objects, and it has to be fast enough for closed-loop control. Yet vision-language-action (VLA) and world-action models (WAMs) take perception from general-purpose vision-language and video-generation backbones, which still fail in these settings. We introduce GroundingPI, a 4B grounding foundation model that generates points and boxes as quantized coordinates in a shared vocabulary. Training combines multimodal and spatial pretraining, supervised fine-tuning, and reinforcement learning with GRPO, using supervision from public datasets and dedicated data engines. Against 44 baselines across 34 grounding benchmarks spanning 11 perceptual capabilities, GroundingPI establishes a new state of the art, averaging 73.68%, above the larger GPT-6 Astra (71.54%). As a downstream visual backbone, GroundingPI improves performance on robotic manipulation and autonomous driving. On RoboTwin 2.0, it outperforms every mainstream backbone we evaluate in all four out-of-distribution settings, by up to 24.8% relative to the strongest backbone. On RoboCasa-GR1, GroundingPI trained with 50% of the demonstrations outperforms those baselines trained with 75%. On nuScenes, used as the visual backbone, GroundingPI attains an average open-loop L2 error of 0.296 m. We systematically analyze GroundingPI's pretraining in scale and data composition. Downstream autonomous driving and robotic manipulation improve as the pretraining is scaled. Analyzing the data recipe across these 11 perceptual capabilities shows dense grounding's substantial benefits for both, and OCR's potential as a catalyst for perceptual learning. These results support grounding as a perceptual foundation, and dedicated perceptual pretraining as a promising direction for foundation models of physical intelligence."
arxiv_id: "2609.39601"
citation_doi: "10.48550/arXiv.2609.39601"
teaser: "/images/groundingpi_wordmark.png"
projecturl: "https://groundingpi.github.io/"
paperurl: "https://arxiv.org/pdf/2609.39601"
bibtexurl: "/files/GroundingPI.bib"
codeurl: "https://github.com/groundingpi/GroundingPI"
citation: "Qize Yu, Lianrui Fan, Boyu Chen, Jiaqi Liang, Xini Ding, Yue Chen, Zetian Song, Yuran Wang, Yi Zou, Kaixuan Wang, Tianxing Chen, Wenxuan Song, Bohan Zhou, Mingleyang Li, Siqiao Huang, Yuqi Ye, Caigao Jiang, Wei Wei, Ruihai Wu, Hang Zhang, Yixiao Ge, Shuchang Zhou, Shilong Liu, Xianming Liu, Ping Luo, Shiyu Huang. \"GroundingPI: A Grounding Foundation Model towards Physical Intelligence with Visual Primitives.\" arXiv preprint arXiv:2609.39601, 2026."
citation_authors:
  - "Qize Yu"
  - "Lianrui Fan"
  - "Boyu Chen"
  - "Jiaqi Liang"
  - "Xini Ding"
  - "Yue Chen"
  - "Zetian Song"
  - "Yuran Wang"
  - "Yi Zou"
  - "Kaixuan Wang"
  - "Tianxing Chen"
  - "Wenxuan Song"
  - "Bohan Zhou"
  - "Mingleyang Li"
  - "Siqiao Huang"
  - "Yuqi Ye"
  - "Caigao Jiang"
  - "Wei Wei"
  - "Ruihai Wu"
  - "Hang Zhang"
  - "Yixiao Ge"
  - "Shuchang Zhou"
  - "Shilong Liu"
  - "Xianming Liu"
  - "Ping Luo"
  - "Shiyu Huang"
keywords:
  - "Visual grounding"
  - "Perceptual pretraining"
  - "Physical intelligence"
community_metrics:
  checked: "2026-10-12"
  hf_url: "https://huggingface.co/papers/2609.39601"
  github_stars: 18
  scholar_url: "https://www.semanticscholar.org/paper/1c36737b788f020ef9881a417275ed3d6a55844d"
authors_short: "Qize Yu*&Dagger;, Lianrui Fan*, <strong>Boyu Chen</strong>*, Jiaqi Liang*, Xini Ding*, et al."
---
Qize Yu, Lianrui Fan, Boyu Chen, Jiaqi Liang, Xini Ding, Yue Chen, Zetian Song, Yuran Wang, Yi Zou, Kaixuan Wang, Tianxing Chen, Wenxuan Song, Bohan Zhou, Mingleyang Li, Siqiao Huang, Yuqi Ye, Caigao Jiang, Wei Wei, Ruihai Wu, Hang Zhang, Yixiao Ge, Shuchang Zhou, Shilong Liu, Xianming Liu, Ping Luo, Shiyu Huang.

[Paper](https://arxiv.org/abs/2609.39601) · [Recommended BibTeX](/files/GroundingPI.bib) · [DOI](https://doi.org/10.48550/arXiv.2609.39601) · [Project](https://groundingpi.github.io/) · [Code](https://github.com/groundingpi/GroundingPI)

## Abstract

Precise grounding matters. It specifies which object is the target and where that object is, even in clutter and for tiny objects, and it has to be fast enough for closed-loop control. Yet vision-language-action (VLA) and world-action models (WAMs) take perception from general-purpose vision-language and video-generation backbones, which still fail in these settings. We introduce GroundingPI, a 4B grounding foundation model that generates points and boxes as quantized coordinates in a shared vocabulary. Training combines multimodal and spatial pretraining, supervised fine-tuning, and reinforcement learning with GRPO, using supervision from public datasets and dedicated data engines. Against 44 baselines across 34 grounding benchmarks spanning 11 perceptual capabilities, GroundingPI establishes a new state of the art, averaging 73.68%, above the larger GPT-6 Astra (71.54%). As a downstream visual backbone, GroundingPI improves performance on robotic manipulation and autonomous driving. On RoboTwin 2.0, it outperforms every mainstream backbone we evaluate in all four out-of-distribution settings, by up to 24.8% relative to the strongest backbone. On RoboCasa-GR1, GroundingPI trained with 50% of the demonstrations outperforms those baselines trained with 75%. On nuScenes, used as the visual backbone, GroundingPI attains an average open-loop L2 error of 0.296 m. We systematically analyze GroundingPI's pretraining in scale and data composition. Downstream autonomous driving and robotic manipulation improve as the pretraining is scaled. Analyzing the data recipe across these 11 perceptual capabilities shows dense grounding's substantial benefits for both, and OCR's potential as a catalyst for perceptual learning. These results support grounding as a perceptual foundation, and dedicated perceptual pretraining as a promising direction for foundation models of physical intelligence.

## Citation

Use this complete entry or download the BibTeX linked above.

{% raw %}
```bibtex
@article{yu2026groundingpi,
  title = {{GroundingPI}: A Grounding Foundation Model towards Physical Intelligence with Visual Primitives},
  author = {Yu, Qize and Fan, Lianrui and Chen, Boyu and Liang, Jiaqi and Ding, Xini and Chen, Yue and Song, Zetian and Wang, Yuran and Zou, Yi and Wang, Kaixuan and Chen, Tianxing and Song, Wenxuan and Zhou, Bohan and Li, Mingleyang and Huang, Siqiao and Ye, Yuqi and Jiang, Caigao and Wei, Wei and Wu, Ruihai and Zhang, Hang and Ge, Yixiao and Zhou, Shuchang and Liu, Shilong and Liu, Xianming and Luo, Ping and Huang, Shiyu},
  journal = {arXiv preprint arXiv:2609.39601},
  year = {2026},
  eprint = {2609.39601},
  archivePrefix = {arXiv},
  primaryClass = {cs.CV},
  doi = {10.48550/arXiv.2609.39601},
  url = {https://arxiv.org/abs/2609.39601}
}
```
{% endraw %}
