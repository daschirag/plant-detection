"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Bell, Check, Plus, Leaf, Sun, Cloud, Wind, ArrowRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type Season = "spring" | "summer" | "fall" | "winter"
type PlantType = "indoor" | "garden" | "trees" | "flowers" | "vegetables" | "herbs"

type CareTask = {
  id: string
  title: string
  description: string
  season: Season
  plantTypes: PlantType[]
  dueDate?: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

type CustomReminder = {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
  recurring: boolean
  recurringInterval?: "daily" | "weekly" | "monthly"
}

export function SeasonalCareCalendar() {
  const [currentSeason, setCurrentSeason] = useState<Season>("spring")
  const [selectedPlantTypes, setSelectedPlantTypes] = useState<PlantType[]>(["indoor", "garden"])
  const [showAddReminder, setShowAddReminder] = useState(false)
  const [newReminder, setNewReminder] = useState<Partial<CustomReminder>>({
    title: "",
    description: "",
    dueDate: "",
    recurring: false,
    recurringInterval: "weekly",
  })
  const [customReminders, setCustomReminders] = useState<CustomReminder[]>([
    {
      id: "custom-1",
      title: "Repot monstera plant",
      description: "Transfer to a larger pot with fresh soil mix",
      dueDate: "2025-04-20",
      completed: false,
      recurring: false,
    },
    {
      id: "custom-2",
      title: "Apply organic fertilizer",
      description: "For all indoor plants",
      dueDate: "2025-04-15",
      completed: true,
      recurring: true,
      recurringInterval: "monthly",
    },
  ])

  // Determine current season based on date
  useEffect(() => {
    const now = new Date()
    const month = now.getMonth()

    if (month >= 2 && month <= 4) {
      setCurrentSeason("spring")
    } else if (month >= 5 && month <= 7) {
      setCurrentSeason("summer")
    } else if (month >= 8 && month <= 10) {
      setCurrentSeason("fall")
    } else {
      setCurrentSeason("winter")
    }
  }, [])

  // Predefined care tasks
  const careTasks: CareTask[] = [
    {
      id: "spring-1",
      title: "Start seeds indoors",
      description: "Begin germinating seeds for summer vegetables and annual flowers",
      season: "spring",
      plantTypes: ["vegetables", "flowers", "herbs"],
      dueDate: "2025-04-15",
      completed: false,
      priority: "high",
    },
    {
      id: "spring-2",
      title: "Prune winter damage",
      description: "Remove dead or damaged branches from trees and shrubs",
      season: "spring",
      plantTypes: ["trees", "garden"],
      dueDate: "2025-04-10",
      completed: true,
      priority: "medium",
    },
    {
      id: "spring-3",
      title: "Apply slow-release fertilizer",
      description: "Feed perennials and shrubs with balanced fertilizer",
      season: "spring",
      plantTypes: ["garden", "flowers", "trees"],
      dueDate: "2025-04-20",
      completed: false,
      priority: "medium",
    },
    {
      id: "spring-4",
      title: "Repot houseplants",
      description: "Refresh soil and move to larger containers if needed",
      season: "spring",
      plantTypes: ["indoor"],
      dueDate: "2025-04-30",
      completed: false,
      priority: "low",
    },
    {
      id: "summer-1",
      title: "Implement watering schedule",
      description: "Adjust watering frequency for hot weather",
      season: "summer",
      plantTypes: ["indoor", "garden", "vegetables", "flowers"],
      dueDate: "2025-06-15",
      completed: false,
      priority: "high",
    },
    {
      id: "summer-2",
      title: "Apply mulch",
      description: "Add 2-3 inches to retain moisture and suppress weeds",
      season: "summer",
      plantTypes: ["garden", "vegetables", "trees"],
      dueDate: "2025-06-10",
      completed: false,
      priority: "medium",
    },
    {
      id: "summer-3",
      title: "Monitor for pests",
      description: "Check for aphids, spider mites, and other summer pests",
      season: "summer",
      plantTypes: ["indoor", "garden", "vegetables", "flowers", "herbs"],
      dueDate: "2025-07-01",
      completed: false,
      priority: "high",
    },
    {
      id: "fall-1",
      title: "Plant spring bulbs",
      description: "Plant tulips, daffodils, and other spring-flowering bulbs",
      season: "fall",
      plantTypes: ["garden", "flowers"],
      dueDate: "2025-10-15",
      completed: false,
      priority: "medium",
    },
    {
      id: "fall-2",
      title: "Reduce watering for indoor plants",
      description: "Adjust watering schedule as growth slows down",
      season: "fall",
      plantTypes: ["indoor"],
      dueDate: "2025-10-01",
      completed: false,
      priority: "medium",
    },
    {
      id: "fall-3",
      title: "Harvest and preserve herbs",
      description: "Dry or freeze herbs before first frost",
      season: "fall",
      plantTypes: ["herbs"],
      dueDate: "2025-09-30",
      completed: false,
      priority: "low",
    },
    {
      id: "winter-1",
      title: "Protect sensitive plants",
      description: "Cover or move tender plants before freezing temperatures",
      season: "winter",
      plantTypes: ["garden", "flowers"],
      dueDate: "2025-12-01",
      completed: false,
      priority: "high",
    },
    {
      id: "winter-2",
      title: "Increase humidity for indoor plants",
      description: "Use humidifier or pebble trays during dry winter months",
      season: "winter",
      plantTypes: ["indoor"],
      dueDate: "2025-12-15",
      completed: false,
      priority: "medium",
    },
    {
      id: "winter-3",
      title: "Plan next year's garden",
      description: "Order seeds and create planting schedule",
      season: "winter",
      plantTypes: ["garden", "vegetables", "flowers", "herbs"],
      dueDate: "2025-01-15",
      completed: false,
      priority: "low",
    },
  ]

  const togglePlantType = (type: PlantType) => {
    if (selectedPlantTypes.includes(type)) {
      setSelectedPlantTypes(selectedPlantTypes.filter((t) => t !== type))
    } else {
      setSelectedPlantTypes([...selectedPlantTypes, type])
    }
  }

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = careTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    // In a real app, you would save this state
    console.log("Updated tasks:", updatedTasks)
  }

  const toggleReminderCompletion = (reminderId: string) => {
    setCustomReminders(
      customReminders.map((reminder) => {
        if (reminder.id === reminderId) {
          return { ...reminder, completed: !reminder.completed }
        }
        return reminder
      }),
    )
  }

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.dueDate) {
      const reminder: CustomReminder = {
        id: `custom-${Date.now()}`,
        title: newReminder.title || "",
        description: newReminder.description || "",
        dueDate: newReminder.dueDate || "",
        completed: false,
        recurring: newReminder.recurring || false,
        recurringInterval: newReminder.recurring ? newReminder.recurringInterval : undefined,
      }
      setCustomReminders([...customReminders, reminder])
      setNewReminder({
        title: "",
        description: "",
        dueDate: "",
        recurring: false,
        recurringInterval: "weekly",
      })
      setShowAddReminder(false)
    }
  }

  const deleteReminder = (id: string) => {
    setCustomReminders(customReminders.filter((reminder) => reminder.id !== id))
  }

  const filteredTasks = careTasks.filter(
    (task) => task.season === currentSeason && task.plantTypes.some((type) => selectedPlantTypes.includes(type)),
  )

  const getSeasonIcon = (season: Season) => {
    switch (season) {
      case "spring":
        return <Leaf className="h-5 w-5" />
      case "summer":
        return <Sun className="h-5 w-5" />
      case "fall":
        return <Wind className="h-5 w-5" />
      case "winter":
        return <Cloud className="h-5 w-5" />
    }
  }

  const getSeasonColor = (season: Season) => {
    switch (season) {
      case "spring":
        return "from-emerald-500 to-green-400"
      case "summer":
        return "from-amber-500 to-yellow-400"
      case "fall":
        return "from-orange-500 to-red-400"
      case "winter":
        return "from-blue-500 to-indigo-400"
    }
  }

  const getSeasonBg = (season: Season) => {
    switch (season) {
      case "spring":
        return "bg-emerald-500/20 border-emerald-500/30"
      case "summer":
        return "bg-amber-500/20 border-amber-500/30"
      case "fall":
        return "bg-orange-500/20 border-orange-500/30"
      case "winter":
        return "bg-blue-500/20 border-blue-500/30"
    }
  }

  const getPriorityColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)
  }

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
      <div className={`bg-gradient-to-r ${getSeasonColor(currentSeason)} p-4 md:p-6`}>
        <div className="flex items-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Seasonal Plant Care Calendar</h2>
            <p className="text-white/80 text-sm">Personalized care reminders for your plants</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Season Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Select Season</h3>
          <div className="grid grid-cols-4 gap-2">
            {(["spring", "summer", "fall", "winter"] as Season[]).map((season) => (
              <motion.button
                key={season}
                className={`p-3 rounded-lg border transition-all ${
                  currentSeason === season
                    ? `bg-gradient-to-r ${getSeasonColor(season)} text-white border-transparent`
                    : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                }`}
                onClick={() => setCurrentSeason(season)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center">
                  {getSeasonIcon(season)}
                  <span className="mt-1 text-sm capitalize">{season}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Plant Type Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Plant Types</h3>
          <div className="flex flex-wrap gap-2">
            {(["indoor", "garden", "trees", "flowers", "vegetables", "herbs"] as PlantType[]).map((type) => (
              <Badge
                key={type}
                variant="outline"
                className={`cursor-pointer capitalize text-sm py-1.5 px-3 ${
                  selectedPlantTypes.includes(type)
                    ? `bg-gradient-to-r ${getSeasonColor(currentSeason)} text-white border-transparent`
                    : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                }`}
                onClick={() => togglePlantType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Season Overview */}
        <div className={`mb-6 p-4 rounded-lg border ${getSeasonBg(currentSeason)}`}>
          <div className="flex items-start gap-3">
            <div className="mt-1">{getSeasonIcon(currentSeason)}</div>
            <div>
              <h3 className="font-bold text-lg capitalize mb-1">{currentSeason} Care Tips</h3>
              <p className="text-white/80 text-sm">
                {currentSeason === "spring" && "Focus on pruning, fertilizing, and preparing for the growing season."}
                {currentSeason === "summer" && "Maintain consistent watering, mulch, and monitor for pests."}
                {currentSeason === "fall" && "Prepare plants for dormancy, plant bulbs, and clean up garden beds."}
                {currentSeason === "winter" &&
                  "Protect sensitive plants, reduce watering for indoor plants, and plan for next year."}
              </p>
            </div>
          </div>
        </div>

        {/* Care Tasks */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Seasonal Care Tasks</h3>
            <Badge variant="outline" className="bg-white/10 text-white border-white/20">
              {filteredTasks.length} tasks
            </Badge>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  className={`p-4 rounded-lg border border-white/20 bg-white/5 ${task.completed ? "opacity-60" : ""}`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex-shrink-0 ${
                        task.completed
                          ? "bg-emerald-500/20 border border-emerald-500/30"
                          : "bg-white/10 border border-white/20"
                      } flex items-center justify-center cursor-pointer`}
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.completed && <Check className="h-3 w-3 text-emerald-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className={`font-medium ${task.completed ? "line-through text-white/50" : "text-white"}`}>
                          {task.title}
                        </h4>
                        <Badge variant="outline" className={`text-xs capitalize ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70 mt-1">{task.description}</p>
                      <div className="flex items-center mt-2 text-xs text-white/50">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.dueDate ? formatDate(task.dueDate) : "Anytime"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-white/50" />
              </div>
              <p className="text-white/70">No tasks for your selected plants this season</p>
              <p className="text-sm text-white/50 mt-1">Try selecting different plant types</p>
            </div>
          )}
        </div>

        {/* Custom Reminders */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">My Custom Reminders</h3>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setShowAddReminder(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Reminder
            </Button>
          </div>

          <AnimatePresence>
            {showAddReminder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="bg-white/5 border-white/20 p-4 mb-4">
                  <h4 className="font-medium mb-3">New Reminder</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="title" className="text-white/70">
                        Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Water orchids"
                        className="bg-white/5 border-white/20 text-white"
                        value={newReminder.title}
                        onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-white/70">
                        Description (optional)
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Use filtered water at room temperature"
                        className="bg-white/5 border-white/20 text-white"
                        value={newReminder.description}
                        onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dueDate" className="text-white/70">
                        Due Date
                      </Label>
                      <Input
                        id="dueDate"
                        type="date"
                        className="bg-white/5 border-white/20 text-white"
                        value={newReminder.dueDate}
                        onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="recurring"
                        checked={newReminder.recurring}
                        onCheckedChange={(checked) => setNewReminder({ ...newReminder, recurring: checked })}
                      />
                      <Label htmlFor="recurring" className="text-white/70">
                        Recurring Reminder
                      </Label>
                    </div>

                    {newReminder.recurring && (
                      <div className="flex gap-2">
                        {(["daily", "weekly", "monthly"] as const).map((interval) => (
                          <Badge
                            key={interval}
                            variant="outline"
                            className={`cursor-pointer capitalize ${
                              newReminder.recurringInterval === interval
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : "bg-white/5 border-white/20 text-white/70"
                            }`}
                            onClick={() => setNewReminder({ ...newReminder, recurringInterval: interval })}
                          >
                            {interval}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => setShowAddReminder(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-500 to-green-400 text-black"
                        onClick={handleAddReminder}
                        disabled={!newReminder.title || !newReminder.dueDate}
                      >
                        Add Reminder
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {customReminders.length > 0 ? (
            <div className="space-y-3">
              {customReminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  className={`p-4 rounded-lg border border-white/20 bg-white/5 ${
                    reminder.completed ? "opacity-60" : ""
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex-shrink-0 ${
                        reminder.completed
                          ? "bg-emerald-500/20 border border-emerald-500/30"
                          : "bg-white/10 border border-white/20"
                      } flex items-center justify-center cursor-pointer`}
                      onClick={() => toggleReminderCompletion(reminder.id)}
                    >
                      {reminder.completed && <Check className="h-3 w-3 text-emerald-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4
                          className={`font-medium ${reminder.completed ? "line-through text-white/50" : "text-white"}`}
                        >
                          {reminder.title}
                        </h4>
                        <div className="flex gap-2">
                          {reminder.recurring && (
                            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              {reminder.recurringInterval}
                            </Badge>
                          )}
                          <button
                            className="text-white/50 hover:text-white/80"
                            onClick={() => deleteReminder(reminder.id)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      {reminder.description && <p className="text-sm text-white/70 mt-1">{reminder.description}</p>}
                      <div className="flex items-center mt-2 text-xs text-white/50">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(reminder.dueDate)}
                        {reminder.recurring && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-[10px] py-0 bg-white/5 border-white/20 text-white/70"
                          >
                            <Bell className="h-2 w-2 mr-1" />
                            Recurring
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                <Bell className="h-6 w-6 text-white/50" />
              </div>
              <p className="text-white/70">No custom reminders yet</p>
              <p className="text-sm text-white/50 mt-1">Add your first reminder to get started</p>
            </div>
          )}
        </div>

        {/* Sync with Calendar */}
        <div className="bg-gradient-to-r from-emerald-500/20 to-green-400/20 rounded-lg p-4 border border-emerald-500/30 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/30 rounded-full p-2">
              <Calendar className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-medium text-white">Sync with your calendar</h4>
              <p className="text-sm text-white/70">Never miss a plant care task</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-400 text-black">
            Connect
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
