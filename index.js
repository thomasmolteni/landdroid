const Discord = require("discord.js")
const client = new Discord.Client({
     intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"] 
})

client.login("MTA1NzI5NzY1OTA4NzU3MzAyMg.GYLKUL.G_y4UJi4MgAj3FLmHF6qPVVMdWMcpFIqVJ-g2c")

client.on('ready', () => {
    client.user.setActivity('Land Citizens', { type: 'LISTENING' });

    client.guilds.cache.forEach(guild => {
        guild.commands.create({
            name: "help",
            description: "Chiedi aiuto sui miei comandi"
        })

        guild.commands.create({
            name: "memberinfo",
            description: "Ottieni le informazioni sull'utente selezionato",
            options: [
                {
                    name: "user",
                    description: "Le informazioni sull'utente da mostrare",
                    type: "USER",
                    required: false
                }
            ]
        })

        guild.commands.create({
            name: "ping",
            description: "Ottieni il ping del Bot"
        })

        guild.commands.create({
            name: "serverinfo",
            description: "Ottieni le informazioni su DARK3R's Land"
        })

        guild.commands.create({
            name: "sourcecode",
            description: "Ottieni il mio Codice Sorgente su GitHub"
        })

        guild.commands.create({
            name :"news",
            description: "Crea un annuncio",
        })
    })
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return

    if (interaction.commandName == "help") {
        var help = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Aiuto su /memberinfo** \r Questo comando mostra le informazioni sul membro selezionato. Queste informazioni includono: Username, ID, Data di Creazione e Data di Unione \r\r<:IconDot:1077352914558918687> **Aiuto su /ping** \rQuesto comando mostra il Ping di Land Droid \r\r<:IconDot:1077352914558918687> **Aiuto su /serverinfo** \rQuesto comando mostra le informazioni sul server. Queste informazioni includono: Nome, Membri Totali, Nitro Boost, Livello del Server e Data di Rilascio \r\r<:IconDot:1077352914558918687> **Comando Source Code** \rQuesto comando mostra il link della Repository di GitHub per Land Droid")

        interaction.reply({ embeds: [help] })
    }

    if (interaction.commandName == "memberinfo") {
        const utente = interaction.options.member ? interaction.options.getUser(member) : interaction.member
        var memberinfo = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setThumbnail(utente.user.avatarURL())
            .setDescription(`<:IconDot:1077352914558918687> **Username:** ${interaction.user.tag} \r<:IconDot:1077352914558918687> **User ID:** ${interaction.user.id} \r<:IconDot:1077352914558918687> **Joined at:** <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:D> \r<:IconDot:1077352914558918687> **Created at:** <t:${Math.floor(interaction.user.createdTimestamp / 1000)}:D>`)

        interaction.reply({ embeds: [memberinfo] })
    }

    if (interaction.commandName == "ping") {
        var ping = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setAuthor({ name:"Land Droid#8824", iconURL: "https://cdn.discordapp.com/avatars/1057297659087573022/74e3f481a38d7fe45d4d190427154f52.png?size=1024"})
            .setDescription(`<:IconDot:1077352914558918687> **Battito Cardiaco:** ${client.ws.ping}ms`)

        interaction.reply({ embeds: [ping] })
    }

    if (interaction.commandName == "serverinfo") {
        var server = interaction.guild;
        var serverinfo = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setThumbnail(server.iconURL({ dynamic: true }))
            .setDescription(`<:IconDot:1077352914558918687> **Server Name:** ${interaction.guild.name} \r<:IconDot:1077352914558918687> **Total Members:** ${interaction.guild.memberCount} Membri \r<:IconDot:1077352914558918687> **Nitro Boosts:** ${interaction.guild.premiumSubscriptionCount} Boosts \r<:IconDot:1077352914558918687> **Server Level:** Level ${interaction.guild.premiumTier} \r<:IconDot:1077352914558918687> **Date Released:** <t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:D>`)
        
        interaction.reply({ embeds: [serverinfo] })
    }

    if (interaction.commandName == "sourcecode") {
        interaction.reply({ content: "https://github.com/thomasmolteni/landdroid" })
    }

    if (interaction.commandName == "news") {
        var canaleNews = client.channels.cache.get("1054480779348029441");
        var embedNews = new Discord.MessageEmbed()
            .setColor("#B9BABF")
            .setDescription("<:gray_dot:1060505152215322675> **PandesalSMP Season2!** \rPandesalSMP è alla ricerca di nuovi membri per questa stagione. Se sei interessato a unirti, compila il modulo di domanda di Minecraft facendo click sul pulsante nel canale <#1054481181720186950> o utilizzando il comando `/pandesalform`. \r\r<:gray_dot:1060505152215322675> **Membro PandesalSMP** \rSe il modulo che hai inviato viene approvato, otterai un ruolo <@&1054488080305897612> e l'accesso al server Minecraft e ai canali Pandesal.")
            .setImage("https://media.discordapp.net/attachments/960438729636466688/986190208661848064/2022-06-13_19.18.17.png?width=1202&height=676")

        var buttonNews = new Discord.MessageButton()
            .setStyle("LINK")
            .setURL("https://discord.com/channels/748109416322301964/1054481181720186950")
            .setLabel("Show Form")

        var rowNews = new Discord.MessageActionRow()
            .addComponents(buttonNews)

        canaleNews.send({ content: "<@&1054488083174805554>", embeds: [embedNews], components: [rowNews] })
        interaction.reply({ content: "Annuncio creato con successo!", ephemeral: true })
    }
})

client.on("messageCreate", message => {
    if (message.content == "?verification") {
        var verify1 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077708736501661726/Verification.png?width=1440&height=359")

        var verify2 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Si prega di Verificarsi** \rQuesto server richiede di verificare te stesso per vedere altri canali, puoi semplicemente verificare cliccando su \"Verify Me\". Se non ha funzionato, contatta un membro dello Staff attivo per aiuto")


        var buttonVerify = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Verify Me")
            .setCustomId("buttonVerify")

        var buttonServerRules = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Server Rules")
            .setCustomId("buttonServerRules")

        var rowVerify = new Discord.MessageActionRow()
            .addComponents(buttonVerify, buttonServerRules) 

        message.channel.send({ embeds: [verify1, verify2], components: [rowVerify] })
    }

    if (message.content == "?info") {
        var info1 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077708711449083956/Information.png?width=1440&height=359")

        var info2 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Benvenuto sul DARK3R's Official Discord Server!** \rGrazie mille per esserti unito. Questo server è completamente basato su DARK3R per consentire ai suoi seguaci e amici di comunicare tra loro. \r\r<:IconDot:1077352914558918687> **Server Information** \r<:ReplyContinued:1022586643506528336> Owned by: <@709672125354606592> \r<:Reply:1022586641908514966> Release Date: <t:1598476740:D>")
            
        var rulesButton = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Server Rules")
            .setCustomId("buttonRules")

        var rolesButton = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Assign Roles")
            .setCustomId("buttonRoles")

        var startButton = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Get Started")
            .setCustomId("buttonStart")

        var row = new Discord.MessageActionRow()
            .addComponents(rulesButton, rolesButton, startButton)

        message.channel.send({ embeds: [info1, info2], components: [row] })
    }

    // Ping @DARK3R

    var ping = ["<@709672125354606592>"]
    var trovata = false;

    ping.forEach(parola => {
        if (message.content.includes(parola)) {
            trovata = true;
        }
    })

    if (trovata) {
        message.reply("DARK3R risponderà tra un momento, per favore spiega il motivo per cui lo hai menzionato. Se l'hai già fatto, fantastico!")
    }

    // Ping @Land Droid

    var ping2 = ["<@1057297659087573022>"]
    var trovata2 = false;

    ping2.forEach(parola => {
        if (message.content.includes(parola)) {
            trovata2 = true;
        }
    })

    if (trovata2) {
        message.reply("Puoi usare `/` per vedere i comandi")
    }

    // Ping @Discord Mod

    var ping3 = ["<@&1054488071447511220>"]
    var trovata3 = false;

    ping3.forEach(parola => {
        if (message.content.includes(parola)) {
            trovata3 = true;
        }
    })

    if (trovata3) {
        message.reply("Se hai bisogno di aiuto dai moderatori, crea un ticket nel canale <#1054481209842991224>")
    }
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return

    // Bottone "Server Rules"

    if (interaction.customId == "buttonRules") {
        var rules1 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077718925984411768/Server_Rules.png?width=1440&height=359")

        var rules2 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **1. Rispetta Ogni Membro** \rRispetta tutti i membri su questo server, trattali allo stesso modo rispettivamente indipendentemente dalla tua fede religiosa e opponiti a simpatie e antipatie. Tratta sempre gli altri con il rispetto che vuoi avere in cambio. \r\r<:IconDot:1077352914558918687> **2. No Spamming** \rNon devi spammare nulla sul server, che si tratti di un messaggio, emoji, immagini o qualsiasi cosa necessaria o non necessaria. Ti è proibito, nemmeno erroneamente, compiere tali atti. Dai una possibilità agli altri membri. \r\r<:IconDot:1077352914558918687> **3. No Contenuti Innapropriati/NSFW** \rQuesto server Discord è per persone di tutte le età. I contenuti sessuali sono severamente vietati. Aiutaci a far crescere una comunità familiare. \r\r<:IconDot:1077352914558918687> **4. Usa le Immagini del Profilo e i Soprannomi Appropriati** \rNon consentiamo ai membri di utilizzare soprannomi offensivi, immagini del profilo inadeguate, ad es. sessuale o offensivo per religiosi, politici, ecc. Inoltre, se i nostri moderatori scoprono qualcuno che ha questo, hanno il diritto di cambiare soprannome e cacciare se tu non ascoltare l'avvertimento. \r\r<:IconDot:1077352914558918687> **5. Segui i ToS & le Linee Guida di Discord** \rOltre alle regole di questo server, dai un'occhiata ai Termini di servizio e alle linee guida della community di Discord ufficiali. \r\r<:IconDot:1077352914558918687> **Note Importanti** \rLa tua presenza in questo server implica l'accettazione di queste e tutte le altre regole, comprese tutte le ulteriori modifiche. Queste modifiche possono essere apportate in qualsiasi momento senza preavviso, è tua responsabilità verificarle. Usa il buon senso e astieniti dal lamentarti quando <@&1054488071447511220> tenta di mantenere un ambiente calmo e sicuro nel server.")

        const buttonTerms = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Discord's Terms of Service")
            .setURL("https://discord.com/terms")

        const buttonGuide = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Discord Community Guidelines")
            .setURL("https://discord.com/guidelines")

        var linkRules = new Discord.MessageActionRow()
            .addComponents(buttonTerms, buttonGuide)
            
        interaction.reply({ embeds: [rules1, rules2], components: [linkRules], ephemeral: true })
    }

    if (interaction.customId == "buttonServerRules") {
        var verifyRule1 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077718925984411768/Server_Rules.png?width=1440&height=359")

        var verifyRule2 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **1. Rispetta Ogni Membro** \rRispetta tutti i membri su questo server, trattali allo stesso modo rispettivamente indipendentemente dalla tua fede religiosa e opponiti a simpatie e antipatie. Tratta sempre gli altri con il rispetto che vuoi avere in cambio. \r\r<:IconDot:1077352914558918687> **2. No Spamming** \rNon devi spammare nulla sul server, che si tratti di un messaggio, emoji, immagini o qualsiasi cosa necessaria o non necessaria. Ti è proibito, nemmeno erroneamente, compiere tali atti. Dai una possibilità agli altri membri. \r\r<:IconDot:1077352914558918687> **3. No Contenuti Innapropriati/NSFW** \rQuesto server Discord è per persone di tutte le età. I contenuti sessuali sono severamente vietati. Aiutaci a far crescere una comunità familiare. \r\r<:IconDot:1077352914558918687> **4. Usa le Immagini del Profilo e i Soprannomi Appropriati** \rNon consentiamo ai membri di utilizzare soprannomi offensivi, immagini del profilo inadeguate, ad es. sessuale o offensivo per religiosi, politici, ecc. Inoltre, se i nostri moderatori scoprono qualcuno che ha questo, hanno il diritto di cambiare soprannome e cacciare se tu non ascoltare l'avvertimento. \r\r<:IconDot:1077352914558918687> **5. Segui i ToS & le Linee Guida di Discord** \rOltre alle regole di questo server, dai un'occhiata ai Termini di servizio e alle linee guida della community di Discord ufficiali. \r\r<:IconDot:1077352914558918687> **Note Importanti** \rLa tua presenza in questo server implica l'accettazione di queste e tutte le altre regole, comprese tutte le ulteriori modifiche. Queste modifiche possono essere apportate in qualsiasi momento senza preavviso, è tua responsabilità verificarle. Usa il buon senso e astieniti dal lamentarti quando <@&1054488071447511220> tenta di mantenere un ambiente calmo e sicuro nel server.")

        const buttonTerms2 = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Discord's Terms of Service")
            .setURL("https://discord.com/terms")

        const buttonGuide2 = new Discord.MessageButton()
            .setStyle("LINK")
            .setLabel("Discord Community Guidelines")
            .setURL("https://discord.com/guidelines")

        var linkRules2 = new Discord.MessageActionRow()
            .addComponents(buttonTerms2, buttonGuide2)

        interaction.reply({ embeds: [verifyRule1, verifyRule2], components: [linkRules2], ephemeral: true })
    }

    // Bottone "Assign Roles"

    if (interaction.customId == "buttonRoles") {
        var roles1 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709082884050964/Assign_Roles.png?width=1440&height=359")

        var roles2 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Assign Roles** \rPer assicurarti di ricevere notifiche solo per gli argomenti che desideri conoscere. Puoi scegliere più ruoli se lo desideri. Si prega gentilmente di scegliere quando o in quale occasione si desidera ricevere il ping. \r\r<:IconDot:1077352914558918687> **Nota su Land Droid** \rSe premi uno dei pulsanti e non viene visualizzato alcun messaggio, il bot potrebbe essere offline, quindi riprova più tardi. Grazie!")

        var buttonNews = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("News Ping")
            .setCustomId("buttonNews")

        var buttonContent = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Content Ping")
            .setCustomId("buttonContent")

        var buttonAll = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("All Pings")
            .setCustomId("buttonAll")

        var rowRoles = new Discord.MessageActionRow()
            .addComponents(buttonNews, buttonContent, buttonAll)        
            
        interaction.reply({ embeds: [roles1, roles2], components: [rowRoles], ephemeral: true })
    }

    // Bottoni "Get Started"

    if (interaction.customId == "buttonStart") {
        var embed1 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709040886501396/Roles_Info.png?width=1440&height=359")

        var embed2 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Server Roles Information** \rQuali sono i ruoli nel server, cosa fanno e come li ottieni? \r\r <@&1054489297580982445> \rI BOT Discord personalizzati di DARK3R, realizzati appositamente per questo server. Questo ruolo non può essere ottenuto \r\r<@&1054488071447511220> \rMantengono la pace in tutto il server e aiutano i membri in caso di problemi. Non sono perfetti, quindi possono anche sbagliare. Questo ruolo viene assegnato solo alle persone di cui gli amministratori si fidano. \r\r <@&1054488103060000848> \rSono utili intelligenza artificiale in grado di eseguire automaticamente diverse attività utili sul nostro server. Ciò include vietare i piantagrane, moderare la discussione, riprodurre musica sul nostro server e così via.")
            
        var previous1 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous1")
            .setDisabled(true)        
    
        var next1 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setCustomId("next1")

        var row2 = new Discord.MessageActionRow()
            .addComponents(previous1, next1)
    
        interaction.reply({ embeds: [embed1, embed2], components: [row2], ephemeral: true })
    }

    if (interaction.customId == "next1") {
        var embed3 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709040886501396/Roles_Info.png?width=1440&height=359")

        var embed4 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<@&1054488080930848768> \rSono i sostenitori della pagina Facebook di DARK3R. Puoi ottenere questo ruolo se acquisti un badge di sostenitore. Se il canale YouTube di DARK3R ha un abbonamento, puoi anche ottenerlo lì quando ti iscrivi. \r\r<@&988436752278646825> \rSono le persone più ricche e interessanti dell'intero server. Grazie al loro Boost, il server può sbloccare vari vantaggi. Discord darà loro anche un'icona Boost accanto al loro nome su questo server. Questo ruolo può essere ottenuto potenziando il server. \r\r<@&1054488080305897612> \rSono i membri che giocano sul server Minecraft chiamato PandesalSMP. Hanno accesso ai canali PandesalSMP e al server Minecraft. Questo ruolo può essere ottenuto compilando il modulo Minecraft. \r\r<@&1049816621809668146> \rI membri con questo ruolo hanno accesso a tutti i canali sul server (esclusi i canali privati). Questo ruolo può essere ottenuto solo tramite verifica.")

        var previous2 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous2")

        var next2 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setCustomId("next2")

        var row3 = new Discord.MessageActionRow()
            .addComponents(previous2, next2)

        interaction.update({ embeds: [embed3, embed4], components: [row3], ephemeral: true })
    }

    if (interaction.customId == "next2") {
        var embed5 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709020242128906/Content_Role.png?width=1440&height=359")

        var embed6 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Content Creators Role** \r<@&1054488071581745193> creano attivamente contenuti diversi per i loro follower. Sono YouTuber, Streamer di Facebook, Streamer di Twitch e così via. Questo ruolo può essere ottenuto se soddisfi i requisiti per Creatori di contenuti. \r\r<:IconDot:1077352914558918687> **Come ottengo il Content Creators Roles?** \rDevi eseguire attivamente lo streaming, il caricamento di video o la pubblicazione sulla tua pagina o canale. Condividi il link della tua pagina o del tuo canale nel canale delle <#1054480997120495636>, se possibile.")
            .addFields(
                {
                    name: "YouTubers:",
                    value: "⇀ 1,000+ Iscritti \r⇀ 10,000 Visual Totali \r⇀ Account Collegato al Discord Account",
                    inline: true
                },
                {
                    name: "Twitch Streamers:",
                    value: "⇀ Affiliazione Twitch \r⇀ 100+ Followers \r⇀ Account Collegato al Discord Account",
                    inline: true
                },
                {
                    name: "Facebook Streamers:",
                    value: "⇀ Level Up Streamers \r⇀ 100+ Followers \r⇀ Se possibile, avere la Page nel Bio di Discord",
                    inline: true
                }
            )

        var previous3 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous3")
                
        var next3 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setCustomId("next3")

        var row4 = new Discord.MessageActionRow()
            .addComponents(previous3, next3)

        interaction.update({ embeds: [embed5, embed6], components: [row4], ephemeral: true })
    }

    if (interaction.customId == "next3") {
        var embed7 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077708981142827149/Create_Tickets.png?width=1440&height=359")

        var embed8 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Creare un Support Ticket** \rSe hai un problema e hai bisogno di aiuto, vai su <#1054481209842991224> e crea un ticket in modo che i moderatori possano aiutarti. Se crei un biglietto senza motivo, verrai avvisato. \r\r<:IconDot:1077352914558918687> **Puoi creare un ticket per...** \r<:ReplyContinued:1022586643506528336> Segnalare un Membro \r<:ReplyContinued:1022586643506528336> Segnalare un Bug del Server \r<:ReplyContinued:1022586643506528336> Reclamare il tuo Ruolo \r<:Reply:1022586641908514966> Chiedere qualcosa di Importante")

        var previous4 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous4")

        var next4 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setCustomId("next4")
            
        var row5 = new Discord.MessageActionRow()
            .addComponents(previous4, next4)    

        interaction.update({ embeds: [embed7, embed8], components: [row5], ephemeral: true })
    }

    if (interaction.customId == "next4") {
        var embed11 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709005482360913/Hooray.png?width=1440&height=359")

        var embed12 = new Discord.MessageEmbed()    
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Hooray... Ce l'hai fatta!** \rDi nuovo, benvenuto in DARK3R's Land!. Ora puoi chattare in <#960536198143676496> e presentarti. Se non vedi questo canale, potresti non essere ancora verificato. Quindi vai prima sul canale di <#1049813687575253082> per verificare.")

        var previous6 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous6")

        var previous7 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous7")
            .setDisabled(true)

        var row7 = new Discord.MessageActionRow()
            .addComponents(previous6, previous7)

        interaction.update({ embeds: [embed11, embed12], components: [row7], ephemeral: true })
    }

    // Bottoni "Get Started" precedenti

    if (interaction.customId == "previous2") {
        var embed1 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709040886501396/Roles_Info.png?width=1440&height=359")

        var embed2 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Server Roles Information** \rQuali sono i ruoli nel server, cosa fanno e come li ottieni? \r\r <@&1054489297580982445> \rI BOT Discord personalizzati di DARK3R, realizzati appositamente per questo server. Questo ruolo non può essere ottenuto \r\r<@&1054488071447511220> \rMantengono la pace in tutto il server e aiutano i membri in caso di problemi. Non sono perfetti, quindi possono anche sbagliare. Questo ruolo viene assegnato solo alle persone di cui gli amministratori si fidano. \r\r <@&1054488103060000848> \rSono utili intelligenza artificiale in grado di eseguire automaticamente diverse attività utili sul nostro server. Ciò include vietare i piantagrane, moderare la discussione, riprodurre musica sul nostro server e così via.")
            
        var previous1 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous1")
            .setDisabled(true)        
    
        var next1 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setCustomId("next1")

        var row2 = new Discord.MessageActionRow()
            .addComponents(previous1, next1)
    
        interaction.update({ embeds: [embed1, embed2], components: [row2], ephemeral: true })
        
    }

    if (interaction.customId == "previous3") {
        var embed3 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709040886501396/Roles_Info.png?width=1440&height=359")

        var embed4 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<@&1054488080930848768> \rSono i sostenitori della pagina Facebook di DARK3R. Puoi ottenere questo ruolo se acquisti un badge di sostenitore. Se il canale YouTube di DARK3R ha un abbonamento, puoi anche ottenerlo lì quando ti iscrivi. \r\r<@&988436752278646825> \rSono le persone più ricche e interessanti dell'intero server. Grazie al loro Boost, il server può sbloccare vari vantaggi. Discord darà loro anche un'icona Boost accanto al loro nome su questo server. Questo ruolo può essere ottenuto potenziando il server. \r\r<@&1054488080305897612> \rSono i membri che giocano sul server Minecraft chiamato PandesalSMP. Hanno accesso ai canali PandesalSMP e al server Minecraft. Questo ruolo può essere ottenuto compilando il modulo Minecraft. \r\r<@&1049816621809668146> \rI membri con questo ruolo hanno accesso a tutti i canali sul server (esclusi i canali privati). Questo ruolo può essere ottenuto solo tramite verifica.")

        var previous2 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous2")

        var next2 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setCustomId("next2")

        var row3 = new Discord.MessageActionRow()
            .addComponents(previous2, next2)

    interaction.update({ embeds: [embed3, embed4], components: [row3], ephemeral: true })
    }

    if (interaction.customId == "previous4") {
        var embed5 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077709020242128906/Content_Role.png?width=1440&height=359")

        var embed6 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Content Creators Role** \r<@&1054488071581745193> creano attivamente contenuti diversi per i loro follower. Sono YouTuber, Streamer di Facebook, Streamer di Twitch e così via. Questo ruolo può essere ottenuto se soddisfi i requisiti per Creatori di contenuti. \r\r<:IconDot:1077352914558918687> **Come ottengo il Content Creators Roles?** \rDevi eseguire attivamente lo streaming, il caricamento di video o la pubblicazione sulla tua pagina o canale. Condividi il link della tua pagina o del tuo canale nel canale delle <#1054480997120495636>, se possibile.")
            .addFields(
                {
                    name: "YouTubers:",
                    value: "⇀ 1,000+ Iscritti \r⇀ 10,000 Visual Totali \r⇀ Account Collegato al Discord Account",
                    inline: true
                },
                {
                    name: "Twitch Streamers:",
                    value: "⇀ Affiliazione Twitch \r⇀ 100+ Followers \r⇀ Account Collegato al Discord Account",
                    inline: true
                },
                {
                    name: "Facebook Streamers:",
                    value: "⇀ Level Up Streamers \r⇀ 100+ Followers \r⇀ Se possibile, avere la Page nel Bio di Discord",
                    inline: true
                }
            )

        var previous3 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous3")
                
        var next3 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setCustomId("next3")

        var row4 = new Discord.MessageActionRow()
            .addComponents(previous3, next3)

        interaction.update({ embeds: [embed5, embed6], components: [row4], ephemeral: true })
    }

    if (interaction.customId == "previous6") {
        var embed7 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setImage("https://media.discordapp.net/attachments/1077684809725390869/1077708981142827149/Create_Tickets.png?width=1440&height=359")

        var embed8 = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription("<:IconDot:1077352914558918687> **Creare un Support Ticket** \rSe hai un problema e hai bisogno di aiuto, vai su <#1054481209842991224> e crea un ticket in modo che i moderatori possano aiutarti. Se crei un biglietto senza motivo, verrai avvisato. \r\r<:IconDot:1077352914558918687> **Puoi creare un ticket per...** \r<:ReplyContinued:1022586643506528336> Segnalare un Membro \r<:ReplyContinued:1022586643506528336> Segnalare un Bug del Server \r<:ReplyContinued:1022586643506528336> Reclamare il tuo Ruolo \r<:Reply:1022586641908514966> Chiedere qualcosa di Importante")

        var previous4 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Previous Page")
            .setCustomId("previous4")

        var next4 = new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Next Page")
            .setCustomId("next4")
            
        var row5 = new Discord.MessageActionRow()
            .addComponents(previous4, next4)    

        interaction.update({ embeds: [embed7, embed8], components: [row5], ephemeral: true })
    }

    // Assegnazione Ruoli

    if (interaction.customId == "buttonVerify") {
        interaction.deferUpdate()

        await interaction.member.roles.add("1049816621809668146")
        await interaction.followUp({ content: "Sei ora stato verificato e hai ottenuto il ruolo <@&1049816621809668146>", ephemeral: true })
    }


    if (interaction.customId == "buttonNews") {
        interaction.deferUpdate()

        await interaction.member.roles.add("1054488083174805554")
        await interaction.followUp({ content: "Gave you the <@&1054488083174805554> role!", ephemeral: true })
    }

    if (interaction.customId == "buttonContent") {
        interaction.deferUpdate()

        await interaction.member.roles.add("1054488092700061796")
        await interaction.followUp({ content: "Gave you the <@&1054488092700061796> role!", ephemeral: true })
    }

    if (interaction.customId == "buttonAll") {
        interaction.deferUpdate()

        await interaction.member.roles.add("1054488083174805554")
        await interaction.member.roles.add("1054488092700061796")
        await interaction.followUp({ content: "Gave you the <@&1054488083174805554> and <@&1054488092700061796> role!", ephemeral: true })
    }
})

