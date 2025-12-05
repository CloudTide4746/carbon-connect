/** @format */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Scan,
  Map,
  Activity,
  Wind,
  Thermometer,
  Droplets,
  AlertTriangle,
  Wifi,
} from "lucide-react";
import { IMAGES } from "../constants/images";

// Fix for default marker icon in Leaflet with React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Coordinates around Pu'er, Yunnan (approx 22.78, 100.97)
const locations = [
  { id: 1, lat: 22.785, lng: 100.975, label: "A-01区" },
  { id: 2, lat: 22.765, lng: 100.955, label: "B-03区" },
  { id: 3, lat: 22.795, lng: 100.995, label: "C-07区" },
  { id: 4, lat: 22.755, lng: 100.985, label: "D-12区" },
];

const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="relative">
        <div class="absolute -top-3 -left-3 w-6 h-6 border border-eco-green-400 rounded-full animate-ping"></div>
        <div class="absolute -top-1 -left-1 w-2 h-2 bg-eco-green-400 rounded-full"></div>
      </div>
    `,
    iconSize: [0, 0], // Size handled by CSS
    iconAnchor: [0, 0],
  });
};

export default function LiveMonitoring() {
  const [scanned, setScanned] = useState<number[]>([]);
  const [metrics, setMetrics] = useState({
    co2: 412,
    temp: 24.5,
    humidity: 68,
    wind: 3.2,
  });

  // 模拟数据实时变化
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        co2: Math.floor(prev.co2 + (Math.random() - 0.5) * 2),
        temp: Number((prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1)),
        humidity: Math.min(
          100,
          Math.max(0, Math.floor(prev.humidity + (Math.random() - 0.5) * 3))
        ),
        wind: Number(
          Math.max(0, prev.wind + (Math.random() - 0.5) * 0.5).toFixed(1)
        ),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 模拟扫描发现热点
  useEffect(() => {
    const interval = setInterval(() => {
      const randomId =
        locations[Math.floor(Math.random() * locations.length)].id;
      setScanned((prev) => {
        if (prev.includes(randomId)) return prev;
        return [...prev, randomId];
      });
      // 5秒后清除标记
      setTimeout(() => {
        setScanned((prev) => prev.filter((id) => id !== randomId));
      }, 5000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='py-20 bg-slate-900 text-white overflow-hidden relative'>
      {/* 背景网格 */}
      <div
        className='absolute inset-0 opacity-20 pointer-events-none'
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-10'>
          <div>
            <div className='flex items-center gap-2 text-eco-green-400 mb-2'>
              <Wifi className='w-5 h-5 animate-pulse' />
              <span className='text-sm font-mono tracking-widest'>
                SYSTEM ONLINE
              </span>
            </div>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              AI 遥感实时监测系统
            </h2>
            <p className='text-slate-400 max-w-xl'>
              基于深度学习的卫星与无人机协同网络，全天候监控林地生态指标、碳通量变化及灾害预警。
            </p>
          </div>
          <div className='mt-6 md:mt-0 flex gap-4'>
            <div className='bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl'>
              <div className='text-xs text-slate-400 mb-1'>覆盖面积</div>
              <div className='text-2xl font-bold text-white font-mono'>
                128,500 <span className='text-sm text-slate-500'>ha</span>
              </div>
            </div>
            <div className='bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl'>
              <div className='text-xs text-slate-400 mb-1'>在线设备</div>
              <div className='text-2xl font-bold text-eco-green-400 font-mono'>
                2,418 <span className='text-sm text-slate-500'>个</span>
              </div>
            </div>
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* 主监控画面 */}
          <div className='lg:col-span-2 relative bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl h-[500px] group z-0'>
            <MapContainer
              center={[22.78, 100.97]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              className='z-0'
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                className='opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700'
              />

              {locations.map((loc) =>
                scanned.includes(loc.id) ? (
                  <Marker
                    key={loc.id}
                    position={[loc.lat, loc.lng]}
                    icon={createCustomIcon()}
                  >
                    <Tooltip
                      direction='right'
                      offset={[10, 0]}
                      opacity={1}
                      permanent
                      className='custom-tooltip bg-transparent border-none shadow-none p-0'
                    >
                      <div className='bg-black/80 text-eco-green-400 text-xs px-2 py-1 rounded border border-eco-green-400/30 whitespace-nowrap backdrop-blur-md'>
                        {loc.label} <br />
                        <span className='text-white'>固碳率正常</span>
                      </div>
                    </Tooltip>
                  </Marker>
                ) : null
              )}
            </MapContainer>

            {/* 扫描线动画 */}
            <motion.div
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className='absolute left-0 w-full h-1 bg-eco-green-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)] z-10 pointer-events-none'
            />

            {/* HUD 元素 */}
            <div className='absolute top-4 left-4 flex gap-2'>
              <span className='bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded border border-red-500/30 flex items-center gap-1'>
                <div className='w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse' />{" "}
                LIVE
              </span>
              <span className='bg-slate-800/50 text-slate-300 text-xs px-2 py-1 rounded border border-slate-600 backdrop-blur'>
                SAT-04 连接稳定
              </span>
            </div>

            {/* 坐标尺 */}
            <div className='absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-slate-500 font-mono'>
              <span>102°43'E</span>
              <span>24°52'N</span>
            </div>
          </div>

          {/* 侧边数据面板 */}
          <div className='space-y-4'>
            {/* 指标卡片 */}
            <div className='bg-slate-800/50 border border-slate-700 rounded-xl p-5 backdrop-blur-sm hover:border-eco-green-500/30 transition-colors'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2 text-slate-300'>
                  <Activity className='w-4 h-4 text-blue-400' />
                  <span className='text-sm'>CO₂ 通量</span>
                </div>
                <span className='text-xs text-slate-500'>ppm</span>
              </div>
              <div className='text-3xl font-mono font-bold text-white flex items-end gap-2'>
                {metrics.co2}
                <span className='text-xs text-eco-green-400 mb-1'>▲ 1.2%</span>
              </div>
              <div className='w-full h-1 bg-slate-700 mt-3 rounded-full overflow-hidden'>
                <motion.div
                  className='h-full bg-blue-500'
                  animate={{ width: `${(metrics.co2 / 500) * 100}%` }}
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm'>
                <div className='flex items-center gap-2 text-slate-300 mb-2'>
                  <Thermometer className='w-4 h-4 text-orange-400' />
                  <span className='text-xs'>地表温度</span>
                </div>
                <div className='text-2xl font-mono font-bold text-white'>
                  {metrics.temp}°C
                </div>
              </div>
              <div className='bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm'>
                <div className='flex items-center gap-2 text-slate-300 mb-2'>
                  <Droplets className='w-4 h-4 text-cyan-400' />
                  <span className='text-xs'>土壤湿度</span>
                </div>
                <div className='text-2xl font-mono font-bold text-white'>
                  {metrics.humidity}%
                </div>
              </div>
            </div>

            <div className='bg-slate-800/50 border border-slate-700 rounded-xl p-5 backdrop-blur-sm'>
              <div className='flex items-center justify-between mb-4'>
                <h4 className='text-sm font-bold text-white flex items-center gap-2'>
                  <AlertTriangle className='w-4 h-4 text-yellow-500' />
                  最近预警
                </h4>
                <span className='text-xs text-slate-500'>实时</span>
              </div>
              <div className='space-y-3'>
                {[
                  {
                    time: "10:42:15",
                    msg: "A-01区 发现异常热源",
                    type: "warning",
                  },
                  {
                    time: "09:15:30",
                    msg: "D-12区 非法入侵监测",
                    type: "alert",
                  },
                  {
                    time: "08:00:00",
                    msg: "系统自检完成，运行正常",
                    type: "info",
                  },
                ].map((log, i) => (
                  <div key={i} className='flex gap-3 text-xs'>
                    <span className='font-mono text-slate-500'>{log.time}</span>
                    <span
                      className={`${
                        log.type === "warning"
                          ? "text-yellow-400"
                          : log.type === "alert"
                          ? "text-red-400"
                          : "text-eco-green-400"
                      }`}
                    >
                      {log.msg}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-eco-green-600/10 border border-eco-green-500/20 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-eco-green-600/20 transition-colors'>
              <div className='flex items-center gap-3'>
                <div className='bg-eco-green-500 p-2 rounded-lg'>
                  <Scan className='w-5 h-5 text-white' />
                </div>
                <div>
                  <div className='text-sm font-bold text-white'>
                    生成监测报告
                  </div>
                  <div className='text-xs text-eco-green-400'>AI 自动分析</div>
                </div>
              </div>
              <Map className='w-5 h-5 text-eco-green-500 group-hover:scale-110 transition-transform' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
