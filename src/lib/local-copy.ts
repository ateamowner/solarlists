import type { City, Service } from "@/config/site";

const copy: Record<string, string> = {
  "dayton-oh:solar-installation":
    "A Dayton purchase install starts with the roof you already have: bungalows and two-stories on tight lots, asphalt that has seen ice, and the occasional slate or tile on a historic block. AES Ohio interconnection is part of the written scope. We do not publish a Dayton-only price.",
  "dayton-oh:tpo-solar":
    "TPO is the first path we offer many Dayton owners who want solar without a large loan. Third-party ownership can put an array on a suitable AES Ohio rooftop with $0 down. You use the power; the TPO provider owns the equipment. A Team Contracting still walks the roof and the bill first.",
  "dayton-oh:solar-panels":
    "Panel layout in Dayton is about remaining shingle life, street-tree shade after leaf-out, and how a low winter sun hits a bungalow plane — not a list of invented brands. Historic-district slate is a pause, not a catalog upsell.",

  "kettering-oh:solar-installation":
    "Kettering purchase jobs are often 1950s–70s ranches and split-levels on AES Ohio. The long asphalt plane is useful, but mature maples and a low pitch change racking and shade more than a new-build street would. Ice-dam history belongs in the first visit.",
  "kettering-oh:tpo-solar":
    "A lot of Kettering owners want the bill relief of solar without taking a big loan against a mid-century house. TPO / $0-down is the first option we discuss. Ownership stays with the TPO provider; AES Ohio still has to interconnect.",
  "kettering-oh:solar-panels":
    "On a Kettering ranch, usable roof is often one simple rectangle — good for panels — unless an oak shades the south side from May through October. We look at winter vs summer shade before we talk module count.",

  "beavercreek-oh:solar-installation":
    "Beavercreek subdivisions near Wright-Patterson usually have larger, less-shaded roofs than Dayton city lots. A purchase install still runs through roof age, HOA rules, architectural shingles, and AES Ohio interconnection. Wider lots do not create a local price list.",
  "beavercreek-oh:tpo-solar":
    "Newer Beavercreek roofs are often closer to TPO-ready because the shingles are younger. $0-down still requires a sound deck and a utility path on an AES Ohio bill. We quote TPO first when the owner does not want a large loan.",
  "beavercreek-oh:solar-panels":
    "East-side lots tend to fight fewer street trees than Oregon District Dayton. Panel layout here is usually orientation, inverter type, and whether an HOA limits visible planes — not alley shade.",

  "centerville-oh:solar-installation":
    "Centerville colonials add roof facets that a Huber ranch does not have. A purchase install has to name which planes get modules, how flashing is protected through ice season, and how AES Ohio interconnection is filed. The historic core is a different access problem than Washington Township.",
  "centerville-oh:tpo-solar":
    "A two-story Centerville colonial can still go TPO if the south or west planes are sound. You are not buying the array. $0-down does not skip an HOA check or a roof inspection before A Team sends a quote.",
  "centerville-oh:solar-panels":
    "More facets mean we talk which planes are worth a string or microinverter layout. A north valley that holds ice is not a panel plane just because the house is large.",

  "huber-heights-oh:solar-installation":
    "Huber Heights brick ranches give you area and a low pitch. A purchase install is often “is the deck and the shingles ready, and will snow sit?” AES Ohio is the usual bill. We will not invent a Huber-only dollar figure to fill this page.",
  "huber-heights-oh:tpo-solar":
    "TPO fits many Huber ranch owners who want solar without a loan on a 1960s house. The TPO provider owns the system; you keep the bill conversation with AES Ohio. Low pitch is a design note, not a disqualifier by itself.",
  "huber-heights-oh:solar-panels":
    "Low-pitch Huber roofs shed snow differently than a steep Dayton Victorian. Panel spacing and walkway setbacks matter more here than a decorative array on a street-facing gable.",

  "fairborn-oh:solar-installation":
    "Fairborn’s older downtown roofs and military-adjacent housing make roof age the first filter. Some blocks need replacement before any purchase install. AES Ohio serves the city; we confirm that on the bill, not from a map guess.",
  "fairborn-oh:tpo-solar":
    "Fairborn owners who may move with a set of orders often ask about TPO so they are not carrying a solar loan. We quote that $0-down path first when the roof is sound. Who owns the system is written in the TPO contract, not implied by this page.",
  "fairborn-oh:solar-panels":
    "Shade in Fairborn is less about downtown street trees and more about neighboring two-stories, additions, and winter sun angles. We will not pick a panel brand to pretend we have a local ranking.",

  "miamisburg-oh:solar-installation":
    "Miamisburg hillside lots and downtown two-stories create steeper pitches and tighter staging than a Huber ranch. A purchase install starts with access, remaining roof life, and AES Ohio — not a river-view premium we invented.",
  "miamisburg-oh:tpo-solar":
    "Steeper Miamisburg roofs can host a TPO system if structure and shingles pass. $0-down does not skip a hillside access check or an ice-season flashing review. The TPO provider owns the equipment.",
  "miamisburg-oh:solar-panels":
    "A bluff or river-adjacent lot can favor a west or southwest plane that still produces. We do not assume every Miamisburg roof is a south-facing ideal just because the zip is close to Dayton.",

  "xenia-oh:solar-installation":
    "Xenia’s mix of older stock and post-storm rebuilds means we ask when the roof was last replaced before a purchase install. AES Ohio is the usual utility. Wind history is a reason to inspect, not a reason to publish a Xenia price.",
  "xenia-oh:tpo-solar":
    "If a Xenia roof was replaced after storm damage, TPO can be a clean fit: newer deck, no huge loan. We still write down who owns the system and what happens if you sell the house.",
  "xenia-oh:solar-panels":
    "More open Xenia lots see wind that a tree-lined Dayton street does not. That changes mounting and warranty questions. It does not create a city-specific panel price on this site.",

  "vandalia-oh:solar-installation":
    "Vandalia ranches and tri-levels near the airport corridor are simpler geometry than Centerville colonials. A purchase install still depends on shingle age, low-pitch snow, and AES Ohio interconnection — not an airport surcharge we made up.",
  "vandalia-oh:tpo-solar":
    "Vandalia owners who want bill relief without a purchase loan can use TPO on a sound roof. Interconnection still goes through the utility on the bill. $0-down is the point of TPO, not a skip of the roof walk.",
  "vandalia-oh:solar-panels":
    "Airport-adjacent wind does not change national panel pricing. It does change how we talk about racking and ice on those low-pitch planes compared with a steep Miamisburg hillside.",

  "springfield-oh:solar-installation":
    "Springfield’s older brick and two-story stock, plus aging asphalt and some slate, makes roof condition the gate for a purchase install. Confirm AES Ohio or the utility printed on your bill. We will not invent a Springfield survey price.",
  "springfield-oh:tpo-solar":
    "Older Springfield housing is exactly where a no-huge-loan TPO path matters. You may not want to finance panels on a roof that still has a decade of life questions. TPO keeps ownership with the provider if the roof and utility path qualify.",
  "springfield-oh:solar-panels":
    "Slate or very old asphalt in Springfield is a reason to pause module selection until the roof plan is honest. National published cost ranges are the only dollar figures we cite.",

  "tipp-city-oh:solar-installation":
    "Tipp City purchase jobs split between the historic downtown and later Miami County subdivisions north of Dayton. A written install still starts with remaining roof life, shade, and AES Ohio interconnection. We do not publish a Tipp-only price.",
  "tipp-city-oh:tpo-solar":
    "Tipp City owners who want bill relief without a large loan can ask for TPO first. $0-down still needs a sound deck and the utility path on an AES Ohio bill. The TPO provider owns the system; A Team Contracting still walks the roof.",
  "tipp-city-oh:solar-panels":
    "Downtown Tipp lots can fight tighter setbacks and older planes; later subdivision roofs are often simpler rectangles. Panel layout follows shade, pitch, and winter sun — not a brand ranking we invented for Miami County.",
};

export function uniqueLocalCopy(city: City, service: Service): string {
  const key = `${city.slug}:${service.slug}`;
  const paragraph = copy[key];
  if (!paragraph) {
    throw new Error(`Missing unique local copy for ${key}`);
  }
  return paragraph;
}
