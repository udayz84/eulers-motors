"use client";

interface VehicleGroundShadowProps {
  className?: string;
  /** Vehicle identifier to automatically apply optimized perspective geometry */
  vehicleId?: string;
  /** Custom tire contact patch spread (percentage offset from edges) */
  frontWheelLeft?: string;
  rearWheelRight?: string;
  /** Vertical elevation adjustment for rear wheel perspective (default: -26%) */
  rearWheelTop?: string;
}

interface VehicleShadowConfig {
  frontRightLeft: string;
  frontRightTop: string;
  frontLeftLeft: string;
  frontLeftTop: string;
  rearWheelRight: string;
  rearWheelTop: string;
  rotation: string;
  isThreeWheeler?: boolean;
  farRearLeft?: string;
  farRearTop?: string;
}

const VEHICLE_CONFIGS: Record<string, VehicleShadowConfig> = {
  "storm-ev-t1500": {
    frontRightLeft: "19%",
    frontRightTop: "-11%",
    frontLeftLeft: "42%",
    frontLeftTop: "0%",
    rearWheelRight: "16%",
    rearWheelTop: "-26%",
    rotation: "-4.5deg",
  },
  "storm-ev-lr-200": {
    frontRightLeft: "19%",
    frontRightTop: "-11%",
    frontLeftLeft: "42%",
    frontLeftTop: "0%",
    rearWheelRight: "16%",
    rearWheelTop: "-26%",
    rotation: "-4.5deg",
  },
  "turbo-ev-1000": {
    frontRightLeft: "18%",
    frontRightTop: "-9%",
    frontLeftLeft: "40%",
    frontLeftTop: "0%",
    rearWheelRight: "15.5%",
    rearWheelTop: "-24%",
    rotation: "-4.2deg",
  },
  "hiload-ev": {
    frontRightLeft: "23%", // Single front wheel
    frontRightTop: "0%",
    frontLeftLeft: "23%",
    frontLeftTop: "0%",
    rearWheelRight: "20%",
    rearWheelTop: "-25%",
    rotation: "-4.8deg",
    isThreeWheeler: true,
    farRearLeft: "47%",
    farRearTop: "-30%",
  },
};

/**
 * Realistic multi-layer ground shadow for vehicle cutouts on perspective showroom floors.
 * Layers:
 * 1. Perspective underbody ground shadow (rotated to follow chassis ground plane from front to rear)
 * 2. Chassis body occlusion (smooth mid-tone ellipse under vehicle wheelbase & rear overhang)
 * 3. Axle grounding band (tight grounding connecting front and rear wheels)
 * 4. Front-Right wheel contact patch (elevated to touch the tire with zero gap)
 * 5. Front-Left wheel contact patch (anchored seamlessly under near front tire)
 * 6. Rear wheel contact patch (elevated to align with perspective rear tire contact line)
 * 7. Rear tire ground contact spread (underneath and behind rear tire footprint)
 */
export default function VehicleGroundShadow({
  className = "",
  vehicleId,
  frontWheelLeft,
  rearWheelRight,
  rearWheelTop,
}: VehicleGroundShadowProps) {
  const config = (vehicleId && VEHICLE_CONFIGS[vehicleId]) || {
    frontRightLeft: "19%",
    frontRightTop: "-11%",
    frontLeftLeft: "42%",
    frontLeftTop: "0%",
    rearWheelRight: "16%",
    rearWheelTop: "-26%",
    rotation: "-4.5deg",
  };

  const finalFrontRightLeft = frontWheelLeft ?? config.frontRightLeft;
  const finalRearRight = rearWheelRight ?? config.rearWheelRight;
  const finalRearTop = rearWheelTop ?? config.rearWheelTop;
  const rotation = config.rotation;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 select-none ${className}`}
    >
      {/* 1. Perspective underbody shadow group (aligned to vehicle chassis ground plane) */}
      <div
        style={{ transform: `translateY(-50%) rotate(${rotation})` }}
        className="absolute inset-0 origin-[48%_50%] transform-gpu"
      >
        {/* Wide ambient diffuse ground shadow (soft spread across floor) */}
        <div className="absolute inset-0 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.44)_0%,rgba(15,23,42,0.22)_48%,transparent_75%)] blur-[16px] md:blur-[22px] transform-gpu" />

        {/* Core chassis occlusion shadow (belly of the truck & rear cargo box blocking direct light) */}
        <div className="absolute left-[8%] right-[4%] top-[12%] h-[68%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(10,15,28,0.70)_0%,rgba(10,15,28,0.34)_52%,transparent_76%)] blur-[8px] md:blur-[12px] transform-gpu" />

        {/* Under-axle contact line (tight ambient occlusion along chassis rails) */}
        <div className="absolute left-[14%] right-[8%] top-[28%] h-[32%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(5,9,18,0.78)_0%,rgba(5,9,18,0.38)_55%,transparent_78%)] blur-[4px] md:blur-[6px] transform-gpu" />
      </div>

      {/* 2. Front-Right wheel contact patch (elevated to touch the tire with zero light gap) */}
      <div
        style={{ left: finalFrontRightLeft, top: config.frontRightTop }}
        className="absolute h-[42%] w-[20%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(2,4,10,0.96)_0%,rgba(5,9,18,0.60)_45%,transparent_75%)] blur-[2.5px] md:blur-[3.5px] transform-gpu"
      />
      <div
        style={{ left: `calc(${finalFrontRightLeft} - 2%)`, top: config.frontRightTop }}
        className="absolute h-[54%] w-[24%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(10,15,28,0.60)_0%,rgba(10,15,28,0.25)_50%,transparent_74%)] blur-[4px] md:blur-[6px] transform-gpu"
      />

      {/* 3. Front-Left wheel contact patch (near front tire contact grounding) */}
      {!config.isThreeWheeler && (
        <>
          <div
            style={{ left: config.frontLeftLeft, top: config.frontLeftTop }}
            className="absolute h-[42%] w-[22%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(2,4,10,0.96)_0%,rgba(5,9,18,0.60)_45%,transparent_75%)] blur-[2.5px] md:blur-[3.5px] transform-gpu"
          />
          <div
            style={{ left: `calc(${config.frontLeftLeft} - 2%)`, top: config.frontLeftTop }}
            className="absolute h-[56%] w-[26%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(10,15,28,0.60)_0%,rgba(10,15,28,0.25)_50%,transparent_74%)] blur-[4px] md:blur-[6px] transform-gpu"
          />
        </>
      )}

      {/* 4. Far rear wheel for 3-wheeler (HiLoad EV) */}
      {config.isThreeWheeler && config.farRearLeft && (
        <div
          style={{ left: config.farRearLeft, top: config.farRearTop }}
          className="absolute h-[38%] w-[18%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(2,4,10,0.85)_0%,rgba(5,9,18,0.45)_50%,transparent_75%)] blur-[3px] md:blur-[4.5px] transform-gpu"
        />
      )}

      {/* 5. Rear visible wheel contact patch (elevated to sit directly underneath the visible rear tire) */}
      <div
        style={{ right: finalRearRight, top: finalRearTop }}
        className="absolute h-[42%] w-[22%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(2,4,10,0.96)_0%,rgba(5,9,18,0.65)_45%,transparent_75%)] blur-[3px] md:blur-[4px] transform-gpu"
      />

      {/* 6. Rear tire ground contact spread (underneath and behind rear dual tire footprint) */}
      <div
        style={{ right: `calc(${finalRearRight} - 2%)`, top: finalRearTop }}
        className="absolute h-[55%] w-[26%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(10,15,28,0.60)_0%,rgba(10,15,28,0.25)_50%,transparent_74%)] blur-[5px] md:blur-[7px] transform-gpu"
      />
    </div>
  );
}
