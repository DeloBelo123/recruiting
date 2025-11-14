"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"

export default function Upload() {
  const [candidatesFiles, setCandidatesFiles] = useState<File[]>([])
  const [jobRequirementsFiles, setJobRequirementsFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"success" | "error" | null>(null)

  const candidatesDropzone = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
      "text/plain": [".csv"],
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        setCandidatesFiles((prev) => [...prev, ...acceptedFiles])
      }
      if (rejectedFiles.length > 0) {
        console.warn("Datei wurde abgelehnt:", rejectedFiles)
      }
    },
    multiple: true,
    noClick: false,
    noKeyboard: false,
  })

  const jobRequirementsDropzone = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
      "text/plain": [".csv"],
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        setJobRequirementsFiles((prev) => [...prev, ...acceptedFiles])
      }
      if (rejectedFiles.length > 0) {
        console.warn("Datei wurde abgelehnt:", rejectedFiles)
      }
    },
    multiple: true,
    noClick: false,
    noKeyboard: false,
  })

  const removeCandidatesFile = (index: number) => {
    setCandidatesFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const removeJobRequirementsFile = (index: number) => {
    setJobRequirementsFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (candidatesFiles.length === 0 || jobRequirementsFiles.length === 0) {
      setUploadStatus("error")
      setTimeout(() => setUploadStatus(null), 3000)
      return
    }

    setUploading(true)
    setUploadStatus(null)

    const formData = new FormData()
    candidatesFiles.forEach((file, index) => {
      formData.append(`candidates_${index}`, file)
    })
    jobRequirementsFiles.forEach((file, index) => {
      formData.append(`jobRequirements_${index}`, file)
    })
    formData.append("candidatesCount", candidatesFiles.length.toString())
    formData.append("jobRequirementsCount", jobRequirementsFiles.length.toString())

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unbekannter Fehler" }))
        console.error("Upload error:", errorData)
        throw new Error(errorData.error || "Upload fehlgeschlagen")
      }

      setUploadStatus("success")
      setCandidatesFiles([])
      setJobRequirementsFiles([])
    } catch (err) {
      console.error("Upload error:", err)
      setUploadStatus("error")
    } finally {
      setUploading(false)
      setTimeout(() => setUploadStatus(null), 5000)
    }
  }

  const Dropzone = ({
    dropzone,
    files,
    label,
    onRemove,
    variant = "default",
  }: {
    dropzone: ReturnType<typeof useDropzone>
    files: File[]
    label: string
    onRemove: (index: number) => void
    variant?: "default" | "secondary"
  }) => {
    const hasFiles = files.length > 0
    const fileCount = files.length
    const isHovered = dropzone.isDragActive
    const [isMouseHovered, setIsMouseHovered] = useState(false)
    const isActive = isHovered || isMouseHovered

    const { getRootProps, getInputProps, open, inputRef } = dropzone
    const { onDragOver, onDragEnter, onDragLeave, onDrop } = getRootProps()

    return (
      <motion.div
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onDragOver?.(e)
        }}
        onDragEnter={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onDragEnter?.(e)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onDragLeave?.(e)
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onDrop?.(e)
        }}
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (target.tagName !== 'BUTTON' && !target.closest('button')) {
            e.preventDefault()
            e.stopPropagation()
            if (inputRef.current) {
              inputRef.current.click()
            } else {
              open()
            }
          }
        }}
        onMouseEnter={() => setIsMouseHovered(true)}
        onMouseLeave={() => setIsMouseHovered(false)}
        className={`relative rounded-lg cursor-pointer ${
          variant === "secondary" ? "min-h-[400px]" : "min-h-[500px]"
        }`}
        animate={{
          backgroundColor: hasFiles
            ? "rgba(34, 197, 94, 0.05)"
            : isActive
            ? "rgba(142, 65, 239, 0.08)"
            : "var(--card)",
        }}
        transition={{ duration: 0.3 }}
      >
        <input {...getInputProps()} style={{ display: 'none' }} />
        
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <motion.rect
            x="1"
            y="1"
            rx="8"
            fill="none"
            stroke={hasFiles ? "rgb(34 197 94)" : "rgb(142 65 239)"}
            strokeWidth="2"
            strokeDasharray="8 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
            }}
            animate={{
              strokeDashoffset: [0, -12],
              opacity: hasFiles ? 0.8 : isActive ? 0.8 : 0.2,
            }}
            transition={{
              strokeDashoffset: {
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: 0.3,
              },
            }}
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12">
          <motion.svg
            className={`w-16 h-16 ${
              hasFiles ? "text-chart-1" : isActive ? "text-primary" : "text-muted-foreground"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{
              scale: isActive ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </motion.svg>
          <div className="text-center mt-6">
            <motion.p 
              className={`font-medium mb-3 ${
                variant === "secondary" ? "text-xl" : "text-2xl"
              }`}
              animate={{
                color: hasFiles ? "rgb(34 197 94)" : isActive ? "rgb(142 65 239)" : "var(--foreground)",
              }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.p>
            {hasFiles ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center gap-2 w-full max-w-md"
              >
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    <svg
                      className="w-6 h-6 text-chart-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-chart-1 font-semibold text-lg truncate flex-1 text-center">
                      {file.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        onRemove(index)
                      }}
                      className="text-destructive hover:text-destructive/80 shrink-0"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                animate={{
                  color: isActive ? "rgb(142 65 239)" : "var(--muted-foreground)",
                }}
                transition={{ duration: 0.3 }}
              >
                CSV-Datei hier ablegen oder klicken zum Auswählen
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <Dropzone
          dropzone={candidatesDropzone}
          files={candidatesFiles}
          label="Kandidaten Liste"
          onRemove={removeCandidatesFile}
        />
        <Dropzone
          dropzone={jobRequirementsDropzone}
          files={jobRequirementsFiles}
          label="Job Requirements"
          onRemove={removeJobRequirementsFile}
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-8">
        {uploadStatus === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-chart-1 font-medium"
          >
            Dateien erfolgreich hochgeladen!
          </motion.p>
        )}
        {uploadStatus === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive font-medium"
          >
            Fehler beim Hochladen. Bitte versuchen Sie es erneut.
          </motion.p>
        )}
        <button
          onClick={handleUpload}
          disabled={uploading || candidatesFiles.length === 0 || jobRequirementsFiles.length === 0}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
        >
          {uploading ? "Wird hochgeladen..." : "Hochladen"}
        </button>
      </div>
    </div>
  )
}

