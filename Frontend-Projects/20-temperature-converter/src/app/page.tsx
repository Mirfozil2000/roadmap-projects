"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { WidthIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

type Unit = "Celsius" | "Fahrenheit" | "Kelvin";

const unitSymbols: Record<Unit, string> = {
  Celsius: "°C",
  Fahrenheit: "°F",
  Kelvin: "K",
};

export default function TemperatureConverter() {
  const [temperature, setTemperature] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<Unit>("Celsius");
  const [toUnit, setToUnit] = useState<Unit>("Fahrenheit");
  const [result, setResult] = useState<string>("0 °C = 32.00 °F");

  const convertTemperature = (temp: number, from: Unit, to: Unit): number => {
    if (from === to) return temp;
    if (from === "Celsius") {
      if (to === "Fahrenheit") return (temp * 9) / 5 + 32;
      if (to === "Kelvin") return temp + 273.15;
    }
    if (from === "Fahrenheit") {
      if (to === "Celsius") return ((temp - 32) * 5) / 9;
      if (to === "Kelvin") return ((temp - 32) * 5) / 9 + 273.15;
    }
    if (from === "Kelvin") {
      if (to === "Celsius") return temp - 273.15;
      if (to === "Fahrenheit") return ((temp - 273.15) * 9) / 5 + 32;
    }
    return temp; // This should never happen, but TypeScript needs it
  };

  useEffect(() => {
    const temp = parseFloat(temperature);
    if (!isNaN(temp)) {
      const convertedTemp = convertTemperature(temp, fromUnit, toUnit);
      setResult(
        `${temperature || "0"} ${
          unitSymbols[fromUnit]
        } = ${convertedTemp.toFixed(2)} ${unitSymbols[toUnit]}`
      );
    } else {
      setResult(
        `0 ${unitSymbols[fromUnit]} = ${convertTemperature(
          0,
          fromUnit,
          toUnit
        ).toFixed(2)} ${unitSymbols[toUnit]}`
      );
    }
  }, [temperature, fromUnit, toUnit]);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setTemperature(value);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen px-[5%]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg flex flex-col gap-4">
            <div className="flex w-fit items-center p-2 bg-muted rounded-full">
              <WidthIcon className="w-4 h-4" />
            </div>
            Temperature Converter
          </CardTitle>
          <CardDescription>
            Enter the temperature and select units for real-time conversion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                type="text"
                inputMode="decimal"
                placeholder="Enter temperature"
                value={temperature}
                onChange={handleTemperatureChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromUnit">From Unit</Label>
              <Select
                value={fromUnit}
                onValueChange={(value: Unit) => setFromUnit(value)}
              >
                <SelectTrigger id="fromUnit">
                  <SelectValue placeholder="From Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="Fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="Kelvin">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="toUnit">To Unit</Label>
              <Select
                value={toUnit}
                onValueChange={(value: Unit) => setToUnit(value)}
              >
                <SelectTrigger id="toUnit">
                  <SelectValue placeholder="To Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="Fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="Kelvin">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center flex-col gap-6 mt-2">
          <Separator className="w-full" />
          <div className="text-center font-medium text-primary">{result}</div>
        </CardFooter>
      </Card>
    </main>
  );
}