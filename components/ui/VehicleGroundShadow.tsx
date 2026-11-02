"use client";

interface VehicleGroundShadowProps {
  className?: string;
  /** Custom tire contact patch spread (percentage offset from edges) */
  frontWheelLeft?: string;
  rearWheelRight?: string;
}

/**
 * Realistic multi-layer ground shadow for vehicle cutouts on perspective floors.
 * Layers:
 * 1. Wide ambient feather (soft overhead diffuse light absorption)
 * 2. Chassis body occlusion (smooth mid-tone ellipse under the vehicle wheelbase)
 * 3. Tire contact patches (ambient occlusion directly where rubber meets pavement)
 * 4. Axle grounding band (tight grounding connecting front and rear wheels)
 */
export default function VehicleGroundShadow({
  className = "",
  frontWheelLeft = "17%",
  rearWheelRight = "16%",
}: VehicleGroundShadowProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 select-none ${className}`}
    >
      {/* 1. Wide ambient diffuse ground shadow (soft spread mimicking tunnel ceiling lights) */}
      <div
        className="absolute inset-0 -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.42)_0%,rgba(15,23,42,0.2)_42%,transparent_72%)] blur-[16px] md:blur-[22px] transform-gpu"
      />

      {/* 2. Core chassis occlusion shadow (belly of the truck blocking direct light) */}
      <div
        className="absolute left-[7%] right-[7%] top-0 h-[68%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(10,15,28,0.65)_0%,rgba(10,15,28,0.32)_48%,transparent_75%)] blur-[8px] md:blur-[12px] transform-gpu"
      />

      {/* 3. Under-axle contact line (tight ambient occlusion along the chassis wheelbase) */}
      <div
        className="absolute left-[12%] right-[12%] top-0 h-[26%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(5,9,18,0.72)_0%,rgba(5,9,18,0.35)_55%,transparent_78%)] blur-[4px] md:blur-[6px] transform-gpu"
      />

      {/* 4. Front wheel contact patch (intense local ambient occlusion under front tire) */}
      <div
        style={{ left: frontWheelLeft }}
        className="absolute top-0 h-[38%] w-[20%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(2,4,10,0.85)_0%,rgba(5,9,18,0.45)_50%,transparent_75%)] blur-[3px] md:blur-[4.5px] transform-gpu"
      />

      {/* 5. Rear wheel contact patch (intense local ambient occlusion under rear dual tires) */}
      <div
        style={{ right: rearWheelRight }}
        className="absolute top-0 h-[40%] w-[22%] -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(2,4,10,0.85)_0%,rgba(5,9,18,0.45)_50%,transparent_75%)] blur-[3px] md:blur-[4.5px] transform-gpu"
      />
    </div>
  );
}
