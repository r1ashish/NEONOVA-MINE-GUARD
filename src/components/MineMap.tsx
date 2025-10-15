"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MineMap = () => {
  useEffect(() => {
    const map = L.map("mining-map", {
      center: [23.8, 85.9],
      zoom: 7,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // 🟤 All major coal mining locations in Jharkhand
    const miningAreas = [
      {
        name: "Jharia Coalfield",
        coords: [23.7517, 86.4203],
        mineral: "Coal",
        color: "#1c1c1c",
        reason:
          "Largest coalfield in Jharkhand, known for rich coking coal used in steel industries.",
      },
      {
        name: "Dhanbad",
        coords: [23.7957, 86.4304],
        mineral: "Coal",
        color: "#2c2c2c",
        reason: "Coal capital of India; numerous collieries under BCCL operations.",
      },
      {
        name: "East Bokaro Coalfield",
        coords: [23.7833, 85.9667],
        mineral: "Coal",
        color: "#333333",
        reason:
          "Located in Bokaro district, contains both coking and non-coking coal reserves.",
      },
      {
        name: "Karanpura Coalfield (North & South)",
        coords: [23.8, 85.3],
        mineral: "Coal",
        color: "#444444",
        reason:
          "Extensive coalfield spanning Ranchi, Chatra, and Hazaribagh; includes major projects like Piparwar.",
      },
      {
        name: "Piparwar Area",
        coords: [23.8, 84.9],
        mineral: "Coal",
        color: "#555555",
        reason:
          "Large open-cast project in North Karanpura region under Central Coalfields Limited (CCL).",
      },
      {
        name: "Rajrappa Area",
        coords: [23.65, 85.65],
        mineral: "Coal",
        color: "#666666",
        reason:
          "Important CCL area in Ramgarh district, producing non-coking coal.",
      },
      {
        name: "Kedla & Hazaribagh Area",
        coords: [23.9929, 85.3615],
        mineral: "Coal",
        color: "#777777",
        reason:
          "Includes Kedla underground and opencast mines in Hazaribagh coal belt.",
      },
      {
        name: "Kathara Area",
        coords: [23.75, 85.866],
        mineral: "Coal",
        color: "#888888",
        reason:
          "Located in Bokaro; major coal production region managed by CCL.",
      },
      {
        name: "Rajhara Coalfield",
        coords: [23.58, 84.35],
        mineral: "Coal",
        color: "#999999",
        reason:
          "Situated in Palamu district; smaller field but with significant reserves.",
      },
      {
        name: "Giridih Coalfield",
        coords: [24.1833, 86.3],
        mineral: "Coal",
        color: "#555555",
        reason:
          "Oldest coal mining region in Jharkhand with prime coking coal seams.",
      },
    ];

    // 🗺 Add circle markers
    miningAreas.forEach((area) => {
      const marker = L.circleMarker(area.coords, {
        radius: 9,
        fillColor: area.color,
        color: "#000",
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(map);

      const popupContent = `
        <div class="popup-title" style="font-weight:bold;font-size:15px;">${area.name}</div>
        <div class="popup-mineral" style="margin-bottom:5px;">Mineral: <strong>${area.mineral}</strong></div>
        <div><strong>Details:</strong><br>${area.reason}</div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });

      marker.on("mouseover", function () {
        this.setRadius(13);
      });
      marker.on("mouseout", function () {
        this.setRadius(9);
      });
    });

    L.control.scale().addTo(map);

    return () => map.remove();
  }, []);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Jharkhand Coal Mining Areas</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          id="mining-map"
          className="w-full h-[500px] rounded-xl shadow-lg border border-border"
        />
      </CardContent>
    </Card>
  );
};

export default MineMap;