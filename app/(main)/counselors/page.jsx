"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Search, User, Award, MessageSquare, Filter, X, Calendar } from "lucide-react";
import { SPECIALTIES } from "@/lib/specialities";
import { getAllCounselors } from "@/actions/counselors";

export default function CounselorsPage() {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedExperienceRanges, setSelectedExperienceRanges] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const experienceRanges = [
    { id: 0, label: "1-5 years", min: 1, max: 5 },
    { id: 1, label: "6-10 years", min: 6, max: 10 },
    { id: 2, label: "11-15 years", min: 11, max: 15 },
    { id: 3, label: "16-20 years", min: 16, max: 20 },
    { id: 4, label: "21+ years", min: 21, max: 100 },
  ];

  useEffect(() => {
    async function fetchCounselors() {
      try {
        const data = await getAllCounselors();
        setCounselors(data.counselors || []);
      } catch (error) {
        console.error("Failed to fetch counselors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCounselors();
  }, []);

  const toggleExperienceRange = (rangeId) => {
    setSelectedExperienceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId]
    );
  };

  const filteredCounselors = useMemo(() => {
    return counselors.filter((counselor) => {
      const matchesSearch =
        !searchTerm ||
        counselor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        counselor.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        counselor.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "all" || counselor.specialty === selectedSpecialty;

      const matchesExperience =
        selectedExperienceRanges.length === 0 ||
        selectedExperienceRanges.some((rangeId) => {
          const range = experienceRanges[rangeId];
          return (
            counselor.experience &&
            counselor.experience >= range.min &&
            counselor.experience <= range.max
          );
        });

      return matchesSearch && matchesSpecialty && matchesExperience;
    });
  }, [counselors, searchTerm, selectedSpecialty, selectedExperienceRanges]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted-foreground">Loading counselors...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
      {/* Sidebar Filters */}
      <aside className={`lg:w-80 shrink-0 lg:pt-[148px] ${showFilters ? "block" : "hidden lg:block"}`}>
        <Card className="bg-card/70 backdrop-blur-md border-border sticky top-24 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Filter className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              </div>

              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Specialty Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Specialty
                </label>

                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="w-full h-10 bg-background border-border text-foreground">
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {SPECIALTIES.map((specialty) => (
                      <SelectItem key={specialty.name} value={specialty.name}>
                        {specialty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Years of Experience
                </label>

                <div className="space-y-2">
                  {experienceRanges.map((range) => (
                    <div key={range.id} className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-muted/60 transition">
                      <Checkbox
                        id={`exp-${range.id}`}
                        checked={selectedExperienceRanges.includes(range.id)}
                        onCheckedChange={() => toggleExperienceRange(range.id)}
                        className="border-border"
                      />
                      <label htmlFor={`exp-${range.id}`} className="text-sm text-muted-foreground cursor-pointer">
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedSpecialty !== "all" || selectedExperienceRanges.length > 0) && (
                <Button
                  variant="outline"
                  className="w-full border-border bg-transparent hover:bg-muted"
                  onClick={() => {
                    setSelectedSpecialty("all");
                    setSelectedExperienceRanges([]);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 text-center">

          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            Find Your Counselor
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl">
            Browse our wellness counselors and find the right match for your needs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, specialty, or description..."
              className="pl-12 h-12 text-base bg-background border-border focus-visible:ring-2 focus-visible:ring-primary/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {!showFilters && (
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 lg:hidden bg-transparent"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          {filteredCounselors.length === 0 ? (
            <span>No counselors found</span>
          ) : (
            <span>
              Showing {filteredCounselors.length} of {counselors.length} counselor
              {counselors.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Counselors Grid */}
        {filteredCounselors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              {searchTerm || selectedSpecialty !== "all" || selectedExperienceRanges.length > 0
                ? "No counselors match your search criteria. Try adjusting your filters."
                : "No counselors available at this time."}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCounselors.map((counselor) => (
              <Card
                key={counselor.id}
                className="
                  bg-card/70 backdrop-blur-md
                  border-border
                  hover:border-primary/30
                  hover:shadow-xl
                  transition-all
                "
              >
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    {/* Counselor Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 overflow-hidden">
                        {counselor.imageUrl ? (
                          <img
                            src={counselor.imageUrl}
                            alt={counselor.name || "Counselor"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="h-8 w-8 text-primary" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-lg mb-1 break-words leading-snug">
                          {counselor.name || "Counselor"}
                        </h3>

                        {counselor.specialty && (
                          <Badge
                            variant="outline"
                            className="
    bg-primary/10
    border-primary/20
    text-primary
    text-xs
    max-w-full
    whitespace-normal
    break-words
    leading-tight
    inline-flex
  "
                          >
                            {counselor.specialty}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Experience */}
                    {counselor.experience && (
                      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <Award className="h-4 w-4 text-primary" />
                        <span>
                          <span className="text-foreground font-medium">
                            {counselor.experience}
                          </span>{" "}
                          year{counselor.experience !== 1 ? "s" : ""} of experience
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    {counselor.description && (
                      <div className="flex-1 mb-4">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <p className="text-sm line-clamp-3 text-muted-foreground">
                            {counselor.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button asChild className="w-full mt-2">
                      <Link href={`/counselors/${counselor.id}`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        View Profile & Book
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
