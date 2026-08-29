import { cities, services, type City, type Service } from "@/config/site";

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

  "oakwood-oh:solar-installation":
    "An Oakwood purchase install starts with the roof you already have: Tudor and foursquare stock on Far Hills and Schantz, leftover slate that is not a standard rack, and street-tree shade that a Kettering ranch does not fight. AES Ohio interconnection is part of the written scope. We do not publish an Oakwood-only price.",
  "oakwood-oh:tpo-solar":
    "TPO can put an array on a suitable Oakwood rooftop with $0 down if the deck and covering pass. Older inner-ring housing is exactly where a no-huge-loan path matters — you may not want to finance panels on a roof that still has slate or life questions. The TPO provider owns the equipment; AES Ohio still interconnects.",
  "oakwood-oh:solar-panels":
    "Panel layout in Oakwood is about remaining covering life, leaf-out shade after May, and how a low winter sun hits a two-story plane behind maples — not a list of invented brands. Historic slate is a pause, not a catalog upsell.",

  "west-carrollton-oh:solar-installation":
    "West Carrollton purchase jobs split between Dixie-corridor ranches and tighter river mill-town two-stories. A written install still starts with remaining roof life, low-pitch snow, and AES Ohio interconnection. We do not invent a West Carrollton survey price.",
  "west-carrollton-oh:tpo-solar":
    "A lot of West Carrollton ranch owners want bill relief without a large loan on a 1960s house. TPO / $0-down is the first option we discuss when the deck is sound. Ownership stays with the TPO provider; AES Ohio still has to interconnect.",
  "west-carrollton-oh:solar-panels":
    "A Dixie ranch often gives you one simple rectangle — good for panels — unless a west plane faces I-75 wind and ice. A river-street two-story is a different pitch conversation than a Huber-style ranch. We will not pick a panel brand to pretend we have a local ranking.",

  "trotwood-oh:solar-installation":
    "Trotwood purchase installs are usually post-war asphalt on wider lots than a Dayton bungalow block. AES Ohio is the usual bill. Open Salem / State Route 49 streets help staging; remaining shingle life and ice at the eaves still come first. We will not invent a Trotwood-only dollar figure.",
  "trotwood-oh:tpo-solar":
    "TPO fits many Trotwood owners who want solar without a loan on a post-war house. The TPO provider owns the system; you keep the bill conversation with AES Ohio. A long ranch plane can host $0-down if the deck and shingles pass.",
  "trotwood-oh:solar-panels":
    "Shade in Trotwood is less about Far Hills maples and more about open west-side lots and neighboring additions. Low-pitch asphalt sheds snow differently than a steep Dayton Victorian. Panel spacing follows that geometry — not a brand catalog.",

  "englewood-oh:solar-installation":
    "Englewood purchase jobs mix later I-70-edge colonials with an older National Road core. A written install still names which planes get modules, how flashing is protected through ice season, and how AES Ohio interconnection is filed. Later subdivisions do not create a local price list.",
  "englewood-oh:tpo-solar":
    "Newer Englewood roofs are often closer to TPO-ready because the shingles are younger. $0-down still requires a sound deck and a utility path on an AES Ohio bill. We quote TPO first when the owner does not want a large loan.",
  "englewood-oh:solar-panels":
    "East-of-I-70 lots tend to fight fewer street trees than Oakwood. Panel layout here is usually orientation, inverter type, and whether an HOA limits visible planes — not alley shade on a Dayton bungalow.",

  "riverside-oh:solar-installation":
    "Riverside’s mix of older east-Dayton asphalt and military-adjacent housing along Woodman makes roof age the first filter. Some blocks need replacement before any purchase install. AES Ohio serves the city; we confirm that on the bill, not from a map guess.",
  "riverside-oh:tpo-solar":
    "Riverside owners who may move with a set of orders often ask about TPO so they are not carrying a solar loan. We quote that $0-down path first when the roof is sound. Who owns the system is written in the TPO contract, not implied by this page.",
  "riverside-oh:solar-panels":
    "Shade in Riverside is less about downtown street trees and more about neighboring two-stories, additions, and winter sun angles near the base. We will not pick a panel brand to pretend we have a Woodman Drive ranking.",

  "moraine-oh:solar-installation":
    "Moraine purchase jobs sit on plant-era gables along the I-75 corridor — simpler geometry than a Centerville colonial, older stock than a Springboro HOA street. AES Ohio interconnection is part of the written scope. Tight lots change staging, not a city price we invented.",
  "moraine-oh:tpo-solar":
    "TPO can fit a Moraine owner who wants solar without a large loan on a mid-century house. $0-down does not skip a deck check or an ice-season flashing review. The TPO provider owns the equipment; AES Ohio still interconnects.",
  "moraine-oh:solar-panels":
    "A Moraine gable is usually one or two simple planes — useful for panels if the asphalt has life left. I-75-corridor wind is a mounting note, not a reason to publish a Moraine panel price. We do not invent a brand ranking.",

  "bellbrook-oh:solar-installation":
    "Bellbrook purchase jobs split between a historic Main Street pitch and later Sugarcreek-edge colonials. A written install still starts with remaining roof life, which planes get modules, and AES Ohio interconnection. We do not publish a Bellbrook-only price.",
  "bellbrook-oh:tpo-solar":
    "A later Bellbrook colonial can still go TPO if the south or west planes are sound. You are not buying the array. $0-down does not skip an HOA check or a roof inspection before A Team sends a quote. Downtown stock is a different roof-first conversation.",
  "bellbrook-oh:solar-panels":
    "More facets on a township-edge colonial mean we talk which planes are worth a string or microinverter layout. A north valley that holds ice on Main Street is not a panel plane just because the house is in Greene County.",

  "springboro-oh:solar-installation":
    "Springboro subdivisions usually have larger, less-shaded roofs than Dayton city lots. A purchase install still runs through roof age, HOA rules, architectural shingles, and interconnection on AES Ohio or the utility printed on your bill. Wider Warren County lots do not create a local price list.",
  "springboro-oh:tpo-solar":
    "Newer Springboro roofs are often closer to TPO-ready because the shingles are younger. $0-down still requires a sound deck and a utility path on the bill. We quote TPO first when the owner does not want a large loan. Confirm AES Ohio or whoever is printed on the statement.",
  "springboro-oh:solar-panels":
    "Open HOA streets tend to fight fewer street trees than Oakwood or Oregon District Dayton. Panel layout here is usually orientation, inverter type, and whether an HOA limits visible planes — not alley shade. Downtown Springboro is a tighter, older walk.",

  "troy-oh:solar-installation":
    "Troy purchase jobs split between public-square two-stories and later Miami County edges north of Tipp City. A written install still starts with remaining roof life, shade, and AES Ohio interconnection. We do not publish a Troy-only price.",
  "troy-oh:tpo-solar":
    "Older Troy downtown housing is exactly where a no-huge-loan TPO path matters. You may not want to finance panels on a roof that still has a decade of life questions. TPO keeps ownership with the provider if the roof and AES Ohio path qualify.",
  "troy-oh:solar-panels":
    "Square-adjacent lots can fight tighter setbacks and older planes; later edge roofs are often simpler rectangles. Panel layout follows shade, pitch, and winter sun — not a brand ranking we invented for Miami County.",

  "clayton-oh:solar-installation":
    "Clayton purchase installs mix later ranch asphalt with older rural-edge covering northwest of Dayton. AES Ohio is the usual bill. Open Randolph Township leftovers help staging; remaining shingle life and ice at the eaves still come first. We will not invent a Clayton survey price.",
  "clayton-oh:tpo-solar":
    "TPO fits Clayton owners who want bill relief without a purchase loan on a later ranch or a rural-edge house that still qualifies. Interconnection still goes through AES Ohio on the bill. $0-down is the point of TPO, not a skip of the roof walk.",
  "clayton-oh:solar-panels":
    "Open northwest lots see fewer street trees than Oakwood and more wind than a Dayton alley. Panel spacing and walkway setbacks on a simple ranch plane matter more here than a decorative array on a street-facing gable.",

  "brookville-oh:solar-installation":
    "Brookville purchase jobs split between a compact downtown pitch and later west-edge ranches along the US-35 / I-70 side. A written install still starts with remaining roof life, shade, and AES Ohio interconnection. We do not publish a Brookville-only price.",
  "brookville-oh:tpo-solar":
    "Brookville owners who want bill relief without a large loan can ask for TPO first. $0-down still needs a sound deck and the utility path on an AES Ohio bill. The TPO provider owns the system; A Team Contracting still walks the roof.",
  "brookville-oh:solar-panels":
    "Downtown Brookville lots can fight tighter setbacks and older planes; later west-edge roofs are often simpler rectangles. Panel layout follows shade, pitch, and winter sun — not a brand ranking we invented for west Montgomery County.",

  "germantown-oh:solar-installation":
    "A Germantown purchase install starts with village-core brick two-stories or later edge asphalt. Older covering and brick-chimney flashing are a pause, not a catalog upsell. AES Ohio interconnection is part of the written scope. We do not invent a Germantown survey price.",
  "germantown-oh:tpo-solar":
    "Older Germantown housing is exactly where a no-huge-loan TPO path matters. You may not want to finance panels on a roof that still has life questions. TPO keeps ownership with the provider if the village-core or later-edge roof and AES Ohio path qualify.",
  "germantown-oh:solar-panels":
    "Village trees and brick two-stories change shade and winter sun more than a Springboro subdivision rectangle. Slate or very old asphalt downtown is a reason to pause module selection until the roof plan is honest. National published cost ranges are the only dollar figures we cite.",

  "franklin-oh:solar-installation":
    "Franklin purchase jobs sit on mill-town two-stories along the river or later I-75-edge housing. Confirm AES Ohio or the utility printed on your bill before interconnection talk. We will not invent a Franklin-only dollar figure to fill this page.",
  "franklin-oh:tpo-solar":
    "A Franklin owner who wants solar without a large loan can use TPO on a sound roof. $0-down does not skip a river-lot access check or an ice-season flashing review. The TPO provider owns the equipment. Confirm the utility on the statement — Warren County bills are not all the same.",
  "franklin-oh:solar-panels":
    "A mill-town two-story is a different panel layout than a Springboro HOA colonial. North planes hold ice; river-adjacent lots are not automatically a south-facing ideal. We do not assume every Franklin roof matches a subdivision rectangle just because both sit on I-75.",
};

for (const city of cities) {
  for (const service of services) {
    const key = `${city.slug}:${service.slug}`;
    if (!copy[key]) {
      throw new Error(`Missing unique local copy for ${key}`);
    }
  }
}

export function uniqueLocalCopy(city: City, service: Service): string {
  const key = `${city.slug}:${service.slug}`;
  const paragraph = copy[key];
  if (!paragraph) {
    throw new Error(`Missing unique local copy for ${key}`);
  }
  return paragraph;
}
