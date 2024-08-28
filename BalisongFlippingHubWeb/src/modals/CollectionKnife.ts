interface CollectionKnifeDTO {
    displayName: string,
    knifeMaker: string,
    baseKnifeModel: string,
    knifeType: string,
    isFavoriteKnife: boolean,
    isFavoriteFlipper: boolean,
    aqquiredDate: string,
    coverPhoto: File
    coverPhotoFileName: string

    msrp: string,
    overallLength: string,
    weight: string,
    pivotSystem: string, 
    latchType: string,
    pinSystem: string,
    hasModularBalance: boolean,
    balanceValue: number | null,

    bladeLength: string,
    bladeThickness: string,
    bladeStyle: string,
    bladeFinish: string,
    bladeMaterial: string,

    handleConstruction: string,
    handleMaterial: string, 
    handleFinish: string,
    handleLength: string,
    handleThickness: string,

    averageScore: number | null,
    qualityScore: number,
    flippingScore: number,
    feelScore: number,
    soundScore: number,
    durabilityScore: number

    // todo at mod work
}