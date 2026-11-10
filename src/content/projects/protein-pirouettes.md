---
title: 'Protein Pirouettes: How do we get more from less?'
shortTitle: Protein Pirouettes
subtitle: How do we get more from less?
description: Getting more from scarce protein stability data through rotational augmentation, with the same ThermoNet architecture and training configuration.
kind: Master's thesis
category: Research
tags: [Protein stability, Machine learning, 3D-CNN, Data augmentation]
order: 1
draft: false
image:
  src: /images/projects/protein-pirouettes.svg
  alt: Schematic of the same protein-like fragment in two orientations, illustrating rotational data augmentation.
repository: https://github.com/andrewharrisonGH/RoDA-ThermoNet
demo: rotation
results:
  - dataset: Ssym
    baseline: 1.57
    augmented: 1.53
  - dataset: S669
    baseline: 1.56
    augmented: 1.52
---

## The question

If you want good models, you need good data, and lots of it. But in protein engineering, experimental measurements of how a mutation changes protein folding stability are scarce. How can we get more value from the measurements we already have?

My Master's research explores **rotational data augmentation (RoDA)**: showing a model existing protein structures from new orientations while preserving their experimental labels.

This work was accepted for a **conference poster and lightning talk**.

## The approach

ThermoNet uses a 3D convolutional neural network (3D-CNN) to predict the change in folding Gibbs free energy, **ΔΔG**, associated with a missense mutation. Its structural inputs are represented as voxel grids, rather like 3D images.

The similarity to early computer vision CNNs suggested a familiar strategy: data augmentation. In the RoDA workflow, paired wild-type and mutant structures are rotated **before voxelisation**. These new views retain the experimental ΔΔG label, supplying additional representations without requiring additional experimental measurements.

The model architecture and training configuration were held constant so that the effect of RoDA could be isolated. Tensor analysis showed structured, label-preserving variation rather than redundant copies.

1. **Start with a structural pair.** Wild-type and mutant structures share an experimental stability-change label.
2. **Rotate the pair together.** Generate new spatial orientations while preserving the label.
3. **Voxelise each orientation.** Convert the rotated structures into inputs for the 3D-CNN.
4. **Train and benchmark.** Evaluate the effect of augmentation with the model architecture and training configuration held constant.

## What changed

Across the **Ssym** and **S669** benchmark datasets, RoDA reduced prediction error and improved thermodynamic anti-symmetry between direct and reverse mutations.

On Ssym, direct RMSE decreased from **1.57 to 1.53 kcal/mol**. On S669, it decreased from **1.56 to 1.52 kcal/mol**. That is an absolute reduction of **0.04 kcal/mol** on each benchmark.

Thermodynamic anti-symmetry captures an expected relationship: reversing a mutation should reverse the sign of its stability change. Improving agreement with that relationship is another way to assess whether predictions reflect the underlying physical problem.

These are the aggregate results reported in my conference abstract. They describe the tested benchmarks, rather than a guarantee for every protein or mutation.

## Why it matters

RoDA extracts more value from scarce experimental ΔΔG measurements **without generating new labels or increasing model complexity**. It is a simple, physically grounded way to improve a structure-based learning workflow.

Future work could combine rotational augmentation with protein pretraining and more sophisticated model architectures to explore whether the benefit extends further.

## Explore the code

The [RoDA-ThermoNet repository](https://github.com/andrewharrisonGH/RoDA-ThermoNet) contains the implementation and instructions for reproducing the workflow, including structure preparation, rotated tensor generation, ensemble training and prediction.

The interactive example below illustrates the augmentation principle. It uses a synthetic fragment, rather than a structure or prediction from the research datasets.

<details>
<summary>Read the conference abstract</summary>

If you want good models, you need good data, and lots of it. In high-throughput protein engineering, predicting how a missense mutation influences protein folding stability is vital. However, experimental measurements of changes in Gibbs free energy (∆∆G) remain scarce, limiting the ability of machine learning models to generalise effectively.

One recent architecture, ThermoNet, uses a 3D convolutional neural network (3D-CNN) to learn relationships between wild-type and mutated protein structures. The similarity of ThermoNet’s architecture to pioneering computer vision CNN models led us to analogous data augmentation techniques. We integrated rotational data augmentation (RoDA) into the ThermoNet workflow, generating new orientations of paired wild-type and mutant protein structures prior to voxelisation. The model architecture and training configuration were held constant, allowing the RoDA effect to be isolated. Tensor analysis showed rotations generated structured, label-preserving variation rather than redundant copies. Across Ssym and S669 benchmark datasets, RoDA reduced prediction error and improved thermodynamic anti-symmetry between direct and reverse mutations. On Ssym, RoDA reduced direct RMSE from 1.57 to 1.53 kcal/mol, while on S669, direct RMSE decreased from 1.56 to 1.52 kcal/mol.

These results demonstrate that rotational augmentation extracts more value from scarce experimental ∆∆G data without generating new labels or increasing model complexity. RoDA brings ThermoNet in-line with more complex models and ahead of other structure-only predictors through a simple and physically grounded approach. Future integration of RoDA with modern protein pretraining and more sophisticated model architectures may provide further opportunities to improve protein stability prediction.

</details>
