
const { spawn } = require('child_process'); 
const path = require('path');

// Fonction pour exécuter un fichier Bash détaché
function executeBashScript(scriptPath, detached = false, writer = null) {
    // le detachement du processus ne fonctionen pas
    console.log("--lancement 2", scriptPath)
    // Utilisation de spawn au lieu de exec pour pouvoir détacher le processus
    const child = spawn('bash', [scriptPath], {
    detached: detached, 
  });
    if (detached) {
        child.unref(); 
    }else{
        if (!!writer==true){
            child.stderr.on('data', (data)=> {
                console.log("---- stderr: ", data.toString('utf-8'));
                writer.send("[TERMINAL] - stdout: " + data.toString('utf-8'));
            })
            child.stdout.on('data', (data)=> {
                console.log("----stdout ", data.toString('utf-8'));
                writer.send("[TERMINAL] - stdout: " + data.toString('utf-8')); 
            })
        }
    }
}

function updateAndRestartBot(channel)  {
    executeBashScript(path.join(__dirname, '.', '..', '..', "restart.sh"), false, channel); 
}

module.exports = {
    updateAndRestartBot
}