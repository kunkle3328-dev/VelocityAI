
/**
 * Automated Follow-Up Sequences page
 * Visual sequence builder with drag-and-drop interface
 */
import React from 'react';

export function FollowUpSequences() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Follow-Up Sequences</h1>
          <p className="text-cyan-400">Build automated multi-step campaigns</p>
        </div>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-cyan-400 text-2xl">⚡</span>
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">Sequence Builder</h3>
          <p className="text-cyan-400 mb-4">
            Drag and drop interface to create automated follow-up campaigns
          </p>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Multi-step conditional workflows</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Wait conditions and triggers</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Visual campaign flowchart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
