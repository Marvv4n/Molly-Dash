
import React, { useState, useEffect } from 'react';
import { Card, Button, ProgressBar } from '@shopify/polaris';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import Lottie from 'lottie-web';
import { Lightning, Brain, Robot } from 'phosphor-react';
import ContentLoader from 'react-content-loader';

export function AIProcessor({ campaignData }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const fadeIn = useSpring({
    opacity: isProcessing ? 1 : 0,
    config: { duration: 300 }
  });

  const processCreative = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/process-creative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      });
      const result = await response.json();
      handleResult(result);
    } catch (error) {
      console.error('AI Processing failed:', error);
    }
    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sectioned>
        <div className="ai-processor-container">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Button 
              onClick={processCreative} 
              loading={isProcessing}
              icon={<Lightning weight="bold" />}
            >
              Optimize Creative
            </Button>
          </motion.div>
          
          <AnimatePresence>
            {isProcessing && (
              <animated.div style={fadeIn}>
                <div className="processing-indicator">
                  <Robot size={32} weight="duotone" />
                  <ProgressBar progress={progress} />
                  <Brain size={24} weight="duotone" className="pulse" />
                </div>
              </animated.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}
