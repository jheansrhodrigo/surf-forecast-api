import { GeoPosition, Beach } from '../models/beach';
import { ForecastPoint } from '@src/clients/stormGlass';

// meters
const waveHeights = {
  ankleToKnee: {
    min: 0.3,
    max: 1.0,
  },
  waistHigh: {
    min: 1.0,
    max: 2.0,
  },
  headHigh: {
    min: 2.0,
    max: 2.5,
  },
};

export class Rating {
  constructor(private beach: Beach) {}

  public getRateForPoint(point: ForecastPoint): number {
    const swellDirection = this.getPositionFromLocation(point.swellDirection);
    const windDirection = this.getPositionFromLocation(point.windDirection);
    const windAndWaveRating = this.getRatingBasedOnWindAndWavePositions(
      swellDirection,
      windDirection
    );
    const swellHeightRating = this.getRatingForSwellSize(point.swellHeight);
    const swellPeriodRating = this.getRatingForSwellPeriod(point.swellPeriod);
    const finalRating =
      (windAndWaveRating + swellHeightRating + swellPeriodRating) / 3;

    return Math.round(finalRating);
  }

  public getRatingBasedOnWindAndWavePositions(
    wavePosition: GeoPosition,
    windPosition: GeoPosition
  ): number {
    if (wavePosition === windPosition) {
      return 1;
    } else if (this.isWindOffShore(wavePosition, windPosition)) {
      return 5;
    }

    return 3;
  }

  public getRatingForSwellPeriod(period: number): number {
    if (period >= 7 && period < 10) {
      return 2;
    } else if (period >= 10 && period < 14) {
      return 4;
    } else if (period >= 14) {
      return 5;
    } else {
      return 1;
    }
  }

  public getRatingForSwellSize(height: number): number {
    if (
      height >= waveHeights.ankleToKnee.min &&
      height < waveHeights.ankleToKnee.max
    ) {
      return 2;
    } else if (
      height >= waveHeights.waistHigh.min &&
      height < waveHeights.waistHigh.max
    ) {
      return 3;
    } else if (height >= waveHeights.headHigh.min) {
      return 5;
    } else {
      return 1;
    }
  }

  public getPositionFromLocation(coordinates: number): GeoPosition {
    if (coordinates >= 310 || (coordinates < 50 && coordinates >= 0)) {
      return GeoPosition.north;
    } else if (coordinates >= 50 && coordinates < 120) {
      return GeoPosition.east;
    } else if (coordinates >= 120 && coordinates < 220) {
      return GeoPosition.south;
    } else if (coordinates >= 220 && coordinates < 310) {
      return GeoPosition.west;
    } else {
      return GeoPosition.east;
    }
  }

  private isWindOffShore(
    wavePosition: GeoPosition,
    windPosition: GeoPosition
  ): boolean {
    return (
      (wavePosition === GeoPosition.north &&
        windPosition === GeoPosition.south &&
        this.beach.position === GeoPosition.north) ||
      (wavePosition === GeoPosition.south &&
        windPosition === GeoPosition.north &&
        this.beach.position === GeoPosition.south) ||
      (wavePosition === GeoPosition.east &&
        windPosition === GeoPosition.west &&
        this.beach.position === GeoPosition.east) ||
      (wavePosition === GeoPosition.west &&
        windPosition === GeoPosition.east &&
        this.beach.position === GeoPosition.west)
    );
  }
}
